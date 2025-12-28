const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const { getIO } = require("../../utils/socket");
const ctrlWrapper = require("../../helpers/controlWrapper");
const mongoose = require("mongoose");

//ricevere massagi di user logato con paginazione
const getMessagesByUserId = async (req, res) => {
  const currentUserId = req.user._id;
  const receiverId = req.params.contactId;
  const limit = Number(req.query.limit) || 5;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const chat = await Chat.findOne({
    participants: { $all: [currentUserId, receiverId] },
  });

  if (!chat) {
    return res.json({ messages: [] });
  }

  const messages = await Message.find({
    chatId: chat._id,
  })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  await Message.updateMany(
    { chatId: chat._id, read: false, senderId: { $ne: currentUserId } },
    { $set: { read: true, readAt: Date() } }
  );

  res.status(200).json({
    status: "success",
    chatId: chat._id,
    messages,
    page,
    limit,
  });
};

//cercare chat esistente o creare nuovo per inviatre massagio con file (imagini)
const sendMessage = async (req, res) => {
  const currentUserId = req.user._id;
  const receiverId = new mongoose.Types.ObjectId(req.params.contactId);
  const { text } = req.body;

  let fileUrl = null;
  let fileType = null;

  if (req.file) {
    fileUrl = req.file.path || req.file.secure_url || null;
    fileType = req.file.mimetype ? req.file.mimetype.split("/")[0] : null;
  }
  let chat = await Chat.findOne({
    participants: { $all: [currentUserId, receiverId] },
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [currentUserId, receiverId],
      lastMessage: null,
    });
  }
  const message = await Message.create({
    chatId: chat._id,
    senderId: currentUserId,
    text,
    fileUrl,
    fileType,
  });

  chat.lastMessage = message._id;
  await chat.save();
  const io = getIO();
  if (io) {
    io.to(chat._id.toString()).emit("receive_message", message);
  }

  res.status(201).json({
    status: "success",
    message: "new message sent",
    data: { message },
  });
};

//Modificare massagio di user logato

const editMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const { text } = req.body;
  const message = await Message.findByIdAndUpdate(
    messageId,
    { text },
    { new: true }
  );
  if (!message) {
    return res
      .status(404)
      .json({ status: "error", message: "Message not found" });
  }

  if (io) {
    io.to(message.chatId.toString()).emit("editMessage", message);
  }
  res.status(200).json({
    status: "success",
    message: "Message updated",
  });
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const message = await Message.findByIdAndDelete(messageId);
  if (!message) {
    return res
      .status(404)
      .json({ status: "error", message: "Message not found" });
  }

  if (io) {
    io.to(message.chatId.toString()).emit("deleteMessage", message);
  }
  res.status(200).json({
    status: "success",
    message: "Message deleted",
  });
};

//Vedere tutti chat di user logato
const getAllMessages = async (req, res) => {
  const currentUserId = req.user._id;
  const chats = await Chat.find({
    participants: currentUserId,
  })
    .populate({
      path: "participants",
      select: "fullName username image",
    })
    .populate({
      path: "lastMessage",
      select: "text createdAt senderId",
    });

  const result = chats.map((chat) => {
    const otherContact = chat.participants.find(
      (contact) => contact._id.toString() !== currentUserId.toString()
    );
    return {
      chatId: chat._id,
      fullname: otherContact.fullName,
      username: otherContact.username,
      avatarImage: otherContact.avatarImage,
      lastMessage: chat.lastMessage,
    };
  });
  res.json({
    status: "success",
    chats: result,
  });
};

module.exports = {
  getMessagesByUserId: ctrlWrapper(getMessagesByUserId),
  sendMessage: ctrlWrapper(sendMessage),
  editMessage: ctrlWrapper(editMessage),
  deleteMessage: ctrlWrapper(deleteMessage),
  getAllMessages: ctrlWrapper(getAllMessages),
};

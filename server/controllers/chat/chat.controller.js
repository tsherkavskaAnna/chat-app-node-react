const Chat = require('../../models/Chat');
const Message = require('../../models/Message');

const { HttpError } = require('../../helpers');
const ctrlWrapper = require('../../helpers/controlWrapper');
const mongoose = require('mongoose');

//ricevere massagi di user logato
const getMessagesByUserId = async (req, res) => {
    const currentUserId = req.user._id;
    const receiverId = req.params.contactId;

    const chat = await Chat.findOne({
        participants: { $all: [currentUserId, receiverId] }
    });

    if (!chat) {
        return res.json({ messages: [] })
    }

    const messages = await Message.find({
        chatId: chat._id
    }).sort('createdAt');

    res.status(200).json({
        status: "success",
        chatId: chat._id,
        messages
    })
}


//cercare chat esistente o creare nuovo per inviatre massagio
const sendMessage = async (req, res) => {
    const currentUserId = req.user._id;
    const receiverId = new mongoose.Types.ObjectId(req.params.contactId);
    const { text } = req.body;
    
    let chat = await Chat.findOne({ 
        participants: { $all: [currentUserId, receiverId] }
    })

    if (!chat) {
        chat = await Chat.create({
            participants: [currentUserId, receiverId],
            lastMessage: null
        });
 
    }
    const message = await Message.create({
        chatId: chat._id,
        senderId: currentUserId,
        text
    });

    chat.lastMessage = message._id;
    await chat.save();

    res.status(201).json({
        status: "success",
        message: "new message sent",
        data: { message }
    })
}

//Vedere tutti chat di user logato
const getAllMessages = async (req, res) => {
    const currentUserId = req.user._id;
    const chats = await Chat.find({
        participants: currentUserId
    }).populate({
        path: "participants",
        select: "fullName username image"
    }).populate({
        path: "lastMessage",
        select: "text createdAt senderId"
    });

    const result = chats.map(chat => {
        const otherContact = chat.participants.find(
            contact => contact._id.toString() !== currentUserId.toString()
        )
console.log(otherContact)
        return {
            chatId: chat._id,
            fullname: otherContact.fullName,
            username: otherContact.username,
            avatarImage: otherContact.avatarImage,
            lastMessage: chat.lastMessage,
        }
    })
    res.json({
        status: "success",
        chats: result 
    })
}


module.exports = {
    getMessagesByUserId: ctrlWrapper(getMessagesByUserId),
    sendMessage: ctrlWrapper(sendMessage),
    getAllMessages: ctrlWrapper(getAllMessages)
}
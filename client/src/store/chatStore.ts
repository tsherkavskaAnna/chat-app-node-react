import { create } from 'zustand';
import {
  deleteMessage,
  getMessagesByContact,
  sendMessage,
  updateMessage,
} from '../actions/chatActions';
import { nanoid } from 'nanoid';
import { socket } from '../socket';

type Message = {
  _id: string;
  senderId: string;
  text?: string;
  fileUrl?: string;
  createdAt: Date;
};

type ChatState = {
  activeContactId: string | null;
  messages: Message[];
  chatId: string | null;
  loading: boolean;
  openChat: (contactId: string) => Promise<void>;
  sendMessageToContact: (formData: FormData) => Promise<void>;
  updateMessageById: (messageId: string, formData: FormData) => Promise<void>;
  deleteMessageById: (messageId: string) => Promise<void>;
  clearChat: () => void;
};

const useChatStore = create<ChatState>((set, get) => {
  socket.off('receive_message');
  socket.on('receive_message', (message: Message & { chatId: string }) => {
    if (message.chatId === get().chatId) {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    }
  });
  return {
    activeContactId: null,
    messages: [],
    loading: true,
    chatId: null,
    openChat: async (contactId) => {
      set({ loading: true, activeContactId: contactId });
      const data = await getMessagesByContact(contactId);
      set({
        messages: data.messages,
        chatId: data.chatId,
        loading: false,
      });
      socket.emit('join_chat', { chatId: data.chatId });
    },
    sendMessageToContact: async (formData) => {
      const contactId = get().activeContactId;
      const chatId = get().chatId;
      const tempId = nanoid();

      if (!contactId) {
        return;
      }
      const textValue = String(formData.get('text') || '').trim();
      const fileValue = String(formData.get('file') || '').trim();

      if (!textValue && !fileValue) return;

      const optimisticMessage = {
        _id: tempId,
        senderId: 'me',
        text: textValue || undefined,
        fileUrl: fileValue || undefined,
        createdAt: new Date(),
      };
      set({
        messages: [...get().messages, optimisticMessage],
      });

      try {
        const res = await sendMessage(contactId, formData);
        socket.emit('send_message', { chatId, message: res.message });
        set((state) => ({
          messages: state.messages.map((m) =>
            m._id === tempId ? res.message : m
          ),
        }));
      } catch {
        set((state) => ({
          messages: state.messages.filter((m) => m._id !== tempId),
        }));
      }
    },
    updateMessageById: async (messageId, formData) => {
      const res = await updateMessage(messageId, formData);
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === messageId ? res.message : m
        ),
      }));
    },
    deleteMessageById: async (messageId) => {
      await deleteMessage(messageId);
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== messageId),
      }));
    },
    clearChat: () => {
      set({
        activeContactId: null,
        chatId: null,
        messages: [],
      });
    },
  };
});

export default useChatStore;

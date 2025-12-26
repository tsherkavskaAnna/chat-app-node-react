import { create } from 'zustand';
import {
  deleteMessage,
  getMessagesByContact,
  sendMessage,
  updateMessage,
} from '../actions/chatActions';
import { nanoid } from 'nanoid';

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
  loading: boolean;
  openChat: (contactId: string) => Promise<void>;
  sendMessageToContact: (formData: FormData) => Promise<void>;
  updateMessageById: (messageId: string, formData: FormData) => Promise<void>;
  deleteMessageById: (messageId: string) => Promise<void>;
  clearChat: () => void;
};

const useChatStore = create<ChatState>((set, get) => ({
  activeContactId: null,
  messages: [],
  loading: true,
  openChat: async (contactId) => {
    set({ loading: true, activeContactId: contactId });
    const data = await getMessagesByContact(contactId);
    set({
      messages: data.messages,
      loading: false,
    });
  },
  sendMessageToContact: async (formData) => {
    const contactId = get().activeContactId;
    const tempId = nanoid();

    if (!contactId) {
      return;
    }
    const optimisticMessage = {
      _id: tempId,
      senderId: 'me',
      text: String(formData.get('text')),
      createdAt: new Date(),
    };

    set({
      messages: [...get().messages, optimisticMessage],
    });

    try {
      const res = await sendMessage(contactId, formData);
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
      messages: [],
    });
  },
}));

export default useChatStore;

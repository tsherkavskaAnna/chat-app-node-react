import { create } from 'zustand';
import {
  createNewContact,
  getContacts,
  updateContact,
  deleteContact,
} from '../actions/contactsActions';

type Contact = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  image?: string;
};
type ContactState = {
  contacts: Contact[];
  loading: boolean;
  fetchContacts: () => Promise<void>;
  addContact: (formData: FormData) => Promise<void>;
  updateContact: (id: string, formData: FormData) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
};

const useContactsStore = create<ContactState>((set, get) => ({
  contacts: [],
  loading: true,
  fetchContacts: async () => {
    set({ loading: true });
    try {
      const data = await getContacts();
      set({ contacts: data.data.contacts, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  addContact: async (formData) => {
    const data = await createNewContact(formData);
    set({ contacts: [...get().contacts, data.contact] });
  },
  updateContact: async (id, formData) => {
    const prevContacts = get().contacts;
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c._id === id ? { ...c, ...Object.fromEntries(formData.entries()) } : c
      ),
    }));
    try {
      const data = await updateContact(id, formData);
      set((state) => ({
        contacts: state.contacts.map((c) => (c._id === id ? data.contact : c)),
      }));
    } catch {
      set({ contacts: prevContacts });
    }
  },
  removeContact: async (id) => {
    const prevContact = get().contacts;
    set((state) => ({
      contacts: state.contacts?.filter((contact) => contact._id !== id),
    }));
    try {
      await deleteContact(id);
    } catch {
      set({ contacts: prevContact });
    }
  },
}));

export default useContactsStore;

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
  contacts: Contact[] | null;
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
    set({ contacts: data.user });
  },
  updateContact: async (formData, contactId) => {
    const data = await updateContact(formData, contactId);
    set({ contacts: data.user });
  },
  removeContact: async (contactId) => {
    const prevContact = get().contacts;
    set((state) => ({
      contacts: state.contacts?.filter((contact) => contact._id !== contactId),
    }));
    try {
      await deleteContact(contactId);
    } catch {
      set({ contacts: prevContact });
    }
  },
}));

export default useContactsStore;

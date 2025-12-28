import { useEffect } from 'react';
import useContactsStore from '../store/contactsStore';
import ContactAvatar from './ContactAvatar';
import useChatStore from '../store/chatStore';

export default function ContactsList() {
  const { contacts, search, fetchContacts } = useContactsStore();
  const { openChat } = useChatStore();

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.username.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <ul>
        {filteredContacts?.map((contact) => (
          <li
            key={contact._id}
            onClick={() => openChat(contact._id)}
            className="flex items-center justify-between border-b-2 border-slate-300 p-3 hover:bg-blue-300/30 cursor-pointer"
          >
            <div className="flex items-center justify-around">
              <ContactAvatar contactId={contact._id} image={contact.image} />
              <div className="ml-3.5">
                <h2 className="text-sm font-semibold text-slate-500">
                  {contact.username}
                </h2>
                <p className="text-xs text-slate-500">{contact.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

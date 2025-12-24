import { useEffect } from 'react';
import useContactsStore from '../store/contactsStore';
import DefaultImage from '../assets/images/man.png';

export default function ContactsList() {
  const { contacts, fetchContacts } = useContactsStore();

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ul className="mt-6">
        {contacts?.map((contact) => (
          <li
            key={contact._id}
            className="flex items-center justify-between border-t-2 border-slate-300 p-3 hover:bg-blue-300/30"
          >
            <div className="flex items-center justify-around">
              <img
                src={contact.image?.trim() ? contact.image : DefaultImage}
                alt="user avatar"
                className="w-14 h-14 rounded-full mr-4 border-2 border-slate-300"
              />
              <div>
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

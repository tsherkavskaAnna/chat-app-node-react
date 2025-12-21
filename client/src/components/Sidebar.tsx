import { useEffect } from 'react';
import useContactsStore from '../store/contactsStore';
import UserSection from './UserSection';
import DefaultImage from '../assets/images/man.png';

export default function Sidebar() {
  const { contacts, fetchContacts } = useContactsStore();
  console.log(contacts);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="h-full border-r-2 border-slate-300 bg-slate-200/20">
      <UserSection />
      <div className="h-full px-4 py-6">
        <form className="max-w-md mx-auto">
          <label
            htmlFor="search"
            className="block mb-2.5 text-sm font-medium text-heading sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-body text-slate-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="lock w-full p-3 ps-9 bg-indigo-500/20 border border-gray-500/10 hover:bg-indigo-500/10 text-heading text-sm rounded-md shadow-xs placeholder:text-body text-gray-700 outline-0"
              placeholder=""
              required
            />
          </div>
        </form>
        <div>
          <ul className="mt-6">
            {contacts?.map((contact) => (
              <li
                key={contact._id}
                className="flex items-center justify-between mb-2 border border-slate-100 p-3 rounded-lg hover:bg-blue-300/30"
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
      </div>
    </div>
  );
}

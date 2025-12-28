import useContactsStore from '../store/contactsStore';
import ContactsList from './ContactsList';
import { FaChevronDown } from 'react-icons/fa';

export default function SearchContact() {
  const { search, searchQuery } = useContactsStore();

  return (
    <div className="flex-1 overflow-y-auto">
      <form className="max-w-md mx-auto px-4 py-6 w-full">
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
            onChange={(e) => searchQuery(e.target.value)}
            value={search}
          />
        </div>
      </form>
      <div>
        <div className="flex flex-nowrap items-center mb-2">
          <p className="px-4 text-slate-500 font-bold">All Contacts</p>
          <FaChevronDown className="fill-slate-500" />
        </div>
        <div className="overflow-y-auto max-h-[calc(85vh-16rem)]">
          <ContactsList />
        </div>
      </div>
    </div>
  );
}

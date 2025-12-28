import useChatStore from '../store/chatStore';
import useContactsStore from '../store/contactsStore';
import Logo from '../assets/icons/logo-chat.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';

export default function ActiveContact() {
  const { activeContactId, clearChat } = useChatStore();
  const { contacts } = useContactsStore();

  const activeContact = contacts.find((c) => c._id === activeContactId);

  if (!activeContact) {
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-indigo-600">Select a contact for</h2>
        <img src={Logo} alt="logo" className="w-18 h-18 object-contain" />
      </div>
    );
  }
  return (
    <div className="flex items-center h-full text-slate-500 md:gap-4 md:justify-between justify-around">
      <button className="md:hidden text-indigo-500" onClick={clearChat}>
        <MdArrowBackIosNew style={{ width: '24px', height: '24px' }} />
      </button>
      <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-6">
        <img
          src={activeContact.image}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-indigo-600 mb-2">
            {activeContact.username}
          </h2>
          <p className="text-sm ">{activeContact.email}</p>
        </div>
      </div>

      <button className="bg-slate-300 w-10 h-10 rounded-full hover:bg-slate-400/30 items-center flex justify-center cursor-pointer">
        <BsThreeDotsVertical />
      </button>
    </div>
  );
}

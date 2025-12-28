import useAuthStore from '../store/authStore';
import useChatStore from '../store/chatStore';
import useContactsStore from '../store/contactsStore';

export default function MessagesSection() {
  const { activeContactId, messages } = useChatStore();
  const { contacts } = useContactsStore();
  const { user } = useAuthStore();

  const activeContact = contacts.find((c) => c._id === activeContactId);
  const myId = user?.id;

  if (!activeContact) {
    return (
      <div className="h-full bg-[url('./assets/images/bg-chat.png')] bg-cover bg-center bg-no-repeat opacity-50"></div>
    );
  }
  return (
    <div className="flex justify-start flex-col p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`w-3/4 p-2 mb-2 px-3.5 py-3 shadow-sm relative ${
            message.senderId === myId
              ? 'bg-indigo-400 text-white self-end rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
              : 'bg-slate-200 text-gray-700 self-start rounded-bl-2xl rounded-tr-2xl rounded-br-2xl'
          }`}
        >
          {message.text && <p>{message.text}</p>}
          {message.fileUrl && (
            <img
              src={message.fileUrl}
              alt="file"
              className="mt-2 max-w-24 max-h-24 rounded"
            />
          )}
          {/*  <p className="text-sm text-gray-700 absolute bottom-2 right-2">
            {message.senderId === myId ? 'You' : activeContact.username}
          </p> */}
        </div>
      ))}
    </div>
  );
}

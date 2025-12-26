import ActiveContact from './ActiveContact';
import MessagesSection from './MessagesSection';

export default function ChatBox() {
  return (
    <div className="bg-white rounded-tr-2xl flex flex-col h-full">
      <div className="h-24 border-b-2 border-slate-300 p-6 ">
        <ActiveContact />
      </div>
      <div className="flex-1 overflow-y-auto bg-white">
        <MessagesSection />
      </div>
      <div className="bg-white p-6 h-24 border-t-2 border-slate-300 ">
        Response section
      </div>
    </div>
  );
}

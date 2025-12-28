import ActiveContact from './ActiveContact';
import MessagesSection from './MessagesSection';
import ResponseMessSection from './ResponseMessSection';

export default function ChatBox() {
  return (
    <div className="bg-white rounded-tr-2xl flex flex-col h-full">
      <div className="h-24 border-b-2 border-slate-300 md:p-6 p-2">
        <ActiveContact />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto h-48 bg-white">
        <MessagesSection />
      </div>
      <div className="bg-white lg:p-6 p-2">
        <ResponseMessSection />
      </div>
    </div>
  );
}

import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <div className="bg-white w-full py-none flex">
      <aside className="w-1/5 h-screen bg-blue-50 ">
        <Sidebar />
      </aside>
      <main className="flex-1">
        <ChatBox />
      </main>
    </div>
  );
}

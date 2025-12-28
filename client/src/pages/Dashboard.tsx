import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import useChatStore from '../store/chatStore';

export default function Dashboard() {
  const { activeContactId } = useChatStore();
  return (
    <div className="bg-[url('./assets/images/mess.png')] bg-cover bg-center bg-no-repeat min-h-screen flex justify-center md:py-10">
      <div className="bg-white w-full h-screen md:h-[85vh] md:w-[90vw] grid md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-4 rounded-none md:rounded-2xl opacity-100 shadow-2xl ring-1 ring-white/60">
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-1 h-full">
          <div
            className={`${
              activeContactId ? 'hidden md:block' : 'block'
            } h-full`}
          >
            <Sidebar />
          </div>
        </div>
        {activeContactId && (
          <div className="absolute inset-0 md:static md:col-span-3 lg:col-span-3 xl:col-span-3 z-20 bg-white shadow-lg">
            <ChatBox />
          </div>
        )}
      </div>
    </div>
  );
}

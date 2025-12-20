import useAuthStore from '../store/authStore';

export default function UserSection() {
  const { user } = useAuthStore();

  return (
    <div className="h-24 border-b-2 border-slate-300 px-2 py-3.5 bg-slate-100 rounded-tl-2xl flex justify-between items-center">
      <div className="flex flex-nowrap items-center">
        <img
          src={user?.avatarImage}
          alt="user avatar"
          className="w-14 h-14 rounded-full mr-4"
        />
        <h2 className="text-sm text-slate-500">{user?.username}</h2>
      </div>
      <div className="gap-2 flex">
        <button className="w-10 h-10 rounded-full bg-slate-300 text-slate-500 cursor-pointer">
          +
        </button>
        <button className="w-10 h-10 rounded-full bg-slate-300 text-slate-500 cursor-pointer">
          +
        </button>
      </div>
    </div>
  );
}

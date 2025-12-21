import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import UserLogo from '../assets/images/user.png';

export default function UserSection() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logout successful');
  };

  return (
    <div className="h-24 border-b-2 border-slate-300 px-2 py-3.5 bg- rounded-tl-2xl flex justify-between items-center bg-white">
      <div className="flex flex-nowrap items-center">
        <button className="cursor-pointer">
          <img
            src={user?.avatarImage || UserLogo}
            alt="user avatar"
            className="w-14 h-14 rounded-full mr-4 border-2 border-slate-300"
          />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-indigo-600">
            Welcome back
          </h1>
          <h2 className="text-sm text-slate-500">{user?.username}</h2>
        </div>
      </div>
      <div className="gap-2 flex">
        <button className="w-10 h-10 rounded-full bg-slate-300 text-slate-500 cursor-pointer hover:bg-slate-400/30">
          +
        </button>
        <button
          className="w-10 h-10 rounded-full bg-slate-300 text-red-500 cursor-pointer flex justify-center items-center hover:bg-slate-400/30"
          onClick={handleLogout}
        >
          <RiLogoutCircleRLine />
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Modal } from '../UI-Component/Modal';

export default function UserLogout() {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowModal(true);
    navigate('/');
    toast.success('Logout successful');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-10 h-10 rounded-full bg-slate-300 text-red-500 flex justify-center items-center  cursor-pointer hover:bg-slate-400/30"
      >
        <RiLogoutCircleRLine />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold mb-10 text-center text-slate-800">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-center gap-4 mt-7">
          <button
            className="px-4 py-2 border border-slate-400 rounded text-slate-500"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
}

import React, { useRef } from 'react';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';
import UserLogo from '../assets/images/user.png';

export default function UserAvatar() {
  const { user, updateUser } = useAuthStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      updateUser(formData);
      toast.success('Avatar updated');
    }
  };
  return (
    <>
      <div
        className="relative w-14 h-14 rounded-full overflow-hidden cursor-pointer group"
        onClick={() => fileRef.current?.click()}
      >
        <img
          src={user?.avatarImage ? user.avatarImage : UserLogo}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs">
          +
        </div>
      </div>
      <div className=" relative top-5 right-4.5 bg-green-500 w-4 h-4 rounded-full"></div>
      <div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}

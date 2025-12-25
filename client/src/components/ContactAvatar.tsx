import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import DefaultImage from '../assets/images/user.png';
import useContactsStore from '../store/contactsStore';

type avatarProps = {
  contactId: string;
  image?: string;
};

export default function ContactAvatar({ contactId, image }: avatarProps) {
  const { updateContact } = useContactsStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    updateContact(contactId, formData)
      .then(() => toast.success('Avatar changed!'))
      .catch(() => toast.error('Errore with changing of avatar'));
  };
  return (
    <>
      <div
        className="relative w-14 h-14 rounded-full overflow-hidden cursor-pointer group"
        onClick={() => fileRef.current?.click()}
      >
        <img
          src={image || DefaultImage}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs">
          +
        </div>
      </div>
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

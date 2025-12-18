import React from 'react';
import UserSection from './UserSection';

export default function Sidebar() {
  return (
    <div className=" bg-blue-50">
      <UserSection />
      <div className="h-screen p-6 border-r-2 border-slate-300">
        List of users
      </div>
    </div>
  );
}

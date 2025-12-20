import UserSection from './UserSection';

export default function Sidebar() {
  return (
    <div className="h-full border-r-2 border-slate-300">
      <UserSection />
      <div className="p-6 h-full">List of users</div>
    </div>
  );
}

import SearchContact from './SearchContact';
import UserSection from './UserSection';

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full border-r-2 border-slate-300 bg-slate-200/20">
      <UserSection />
      <SearchContact />
    </div>
  );
}

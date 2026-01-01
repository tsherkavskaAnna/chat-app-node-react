import Logo from '../assets/icons/logo-chat.png';

export default function NotFoound() {
  return (
    <div className="w-full h-screen flex justify-center items-center md:px-4">
      <div className="w-full bg-white flex flex-col justify-center items-center md:h-[70vh] md:w-[75vw] border border-white md:rounded-2xl shadow-xl">
        <img src={Logo} alt="logo" className="w-20 h-20" />
        <h1 className="text-4xl text-slate-500">Not Found Page</h1>
      </div>
    </div>
  );
}

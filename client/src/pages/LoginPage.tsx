import Image from '../assets/images/girl-phone.png';
import RegisterForm from '../components/RegisterForm';
import WelcomeAnimated from '../components/WelcomeFade';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="grid grid-cols-2 min-h-[70vh] w-[75vw] border border-white rounded-2xl shadow-xl">
        <div className="flex flex-col justify-center items-center bg-white backdrop-blur-sm p-6 rounded-l-2xl">
          <WelcomeAnimated />
          <RegisterForm />
        </div>
        <div className="relative w-full h-full rounded-r-2xl bg-withe/50 backdrop-blur-lg">
          <img
            src={Image}
            alt="girl-with-phone"
            className="w-full h-full object-cover opacity-90 rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}

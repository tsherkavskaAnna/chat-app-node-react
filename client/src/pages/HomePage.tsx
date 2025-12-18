import { useState } from 'react';
import Image from '../assets/images/girl-phone.png';

import RegisterForm from '../components/RegisterForm';
import WelcomeAnimated from '../components/WelcomeFade';
import LoginForm from '../components/LoginForm';

export default function HomePage() {
  const [showLoggetIn, setShowLoggetIn] = useState(false);
  return (
    <div className="min-h-screen flex justify-center items-center md:px-4">
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-screen md:h-[70vh] md:w-[75vw] border border-white md:rounded-2xl shadow-xl">
        <div className="flex flex-col justify-center items-center bg-white backdrop-blur-sm p-6 md:rounded-2xl xl:rounded-l-2xl xl:rounded-r-none">
          <WelcomeAnimated />
          {showLoggetIn ? <LoginForm /> : <RegisterForm />}
          <div className="text-center mt-4">
            <span className={showLoggetIn ? 'text-gray-500' : 'text-slate-500'}>
              {showLoggetIn
                ? "Don't have an account? "
                : 'Already have an account? '}
            </span>
            <button
              className="text-indigo-500 underline ml-1"
              onClick={() => setShowLoggetIn(!showLoggetIn)}
            >
              {showLoggetIn ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
        <div className="relative hidden md:rounded-r-2xl bg-withe/50 backdrop-blur-lg xl:block">
          <img
            src={Image}
            alt="girl-with-phone"
            className="w-full h-full object-cover opacity-90 md:rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';

import Logo from '../assets/icons/logo-chat.png';

export default function WelcomeAnimated() {
  return (
    <>
      <motion.img
        src={Logo}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-18 h-18 object-contain"
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl font-bold bg-linear-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text"
      >
        Welcome
      </motion.h1>
    </>
  );
}

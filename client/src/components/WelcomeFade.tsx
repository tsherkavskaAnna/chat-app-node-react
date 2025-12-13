import { motion } from 'framer-motion';

export default function WelcomeAnimated() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-5xl font-bold bg-linear-to-r from-purple-500 to-indigo-400 text-transparent bg-clip-text"
    >
      Welcome
    </motion.h1>
  );
}

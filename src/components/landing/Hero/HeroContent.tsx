'use client';

import { motion } from 'framer-motion';

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
        🚀 AI Powered Exam Preparation
      </div>

      <h1 className="mt-8 text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-white">
        Master Every
        <br />

        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
          Competitive Exam
        </span>

        <br />

        with AI
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
        Practice real previous year questions for GATE, UPSC, CAT,
        IIT JAM and NET-JRF—or upload any PDF and let AI instantly
        create an interactive practice session.
      </p>
    </motion.div>
  );
}
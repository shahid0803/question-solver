'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-4 flex items-center justify-between">

          <Logo />

          <nav className="hidden lg:flex gap-10 text-gray-300">
            <Link href="#features" className="hover:text-white transition">
              Features
            </Link>

            <Link href="#workflow" className="hover:text-white transition">
              Workflow
            </Link>

            <Link href="#pricing" className="hover:text-white transition">
              Pricing
            </Link>

            <Link href="#contact" className="hover:text-white transition">
              Contact
            </Link>
          </nav>

          <div className="flex gap-4">

            <button
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </button>

            <button
              className="
              rounded-xl
              px-6
              py-3
              bg-gradient-to-r
              from-violet-600
              to-cyan-500
              text-white
              font-semibold
              shadow-xl
              hover:scale-105
              transition"
            >
              Get Started
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
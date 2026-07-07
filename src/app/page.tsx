import React from 'react';
import { Background } from '@/components/landing/Background';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
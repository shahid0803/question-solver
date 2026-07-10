import React from 'react';
import { Background } from '@/components/landing/Background';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { PracticeLibrary } from '@/components/landing/PracticeLibrary';
import { StudyWorkspace } from '@/components/landing/StudyWorkspace';
import { ExamMode } from '@/components/landing/ExamMode';
import { PerformanceDashboard } from '@/components/landing/PerformanceDashboard';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <PracticeLibrary />
        <StudyWorkspace />
        <ExamMode />
        <PerformanceDashboard />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
'use client';

import AnimatedGradient from './AnimatedGradient';
import Stars from './Stars';
import Glow from './Glow';
import Noise from './Noise';
import Particles from './Particles';

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,22,0.05),rgba(5,8,22,0.88))]" />
      <Stars />
      <Glow />
      <AnimatedGradient />
      <Particles />
      <Noise />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
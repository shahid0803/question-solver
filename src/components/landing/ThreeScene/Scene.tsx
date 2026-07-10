'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 40,
      }}
    >
      <Experience />
    </Canvas>
  );
}
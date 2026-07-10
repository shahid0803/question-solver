'use client';

import { Environment } from '@react-three/drei';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[6, 8, 5]}
        intensity={3}
      />

      <pointLight
        position={[-4, 3, 2]}
        intensity={2}
        color="#7c3aed"
      />

      <pointLight
        position={[4, 2, 3]}
        intensity={2}
        color="#06b6d4"
      />

      <Environment preset="city" />
    </>
  );
}
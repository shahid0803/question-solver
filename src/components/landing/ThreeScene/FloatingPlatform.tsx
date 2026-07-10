'use client';

import { Float, RoundedBox } from '@react-three/drei';

export default function FloatingPlatform() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.4}
      floatIntensity={1.4}
    >
      <RoundedBox
        args={[4.8, 0.35, 3]}
        radius={0.12}
        smoothness={6}
      >
        <meshPhysicalMaterial
          color="#111827"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </RoundedBox>
    </Float>
  );
}
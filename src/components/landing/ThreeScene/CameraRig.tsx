'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  children: React.ReactNode;
}

export default function CameraRig({ children }: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (!group.current) return;

    group.current.rotation.y = mouse.x * 0.25;
    group.current.rotation.x = -mouse.y * 0.15;
  });

  return <group ref={group}>{children}</group>;
}
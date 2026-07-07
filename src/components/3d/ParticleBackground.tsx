'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '@/lib/3d/useThreeScene';
import useMousePosition from '@/lib/3d/useMousePosition';

export interface ParticleBackgroundProps {
  particleCount?: number;
  particleSize?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 1000,
  particleSize = 2,
  speed = 0.5,
  interactive = true,
  className = '',
}) => {
  const { containerRef, isReady, dimensions } = useThreeScene();
  const mousePos = useMousePosition();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particleVelocitiesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!isReady || !containerRef.current || dimensions.width === 0) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;
    scene.fog = new THREE.Fog(0x000000, 1000, 3000);

    const camera = new THREE.PerspectiveCamera(
      75,
      dimensions.width / dimensions.height,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 400;
      positions[i3 + 1] = (Math.random() - 0.5) * 400;
      positions[i3 + 2] = (Math.random() - 0.5) * 400;

      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleVelocitiesRef.current = velocities;

    const material = new THREE.PointsMaterial({
      size: particleSize,
      sizeAttenuation: true,
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.6,
      fog: true,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (!particlesRef.current) return;

      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      const velocities = particleVelocitiesRef.current!;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        if (Math.abs(positions[i3]) > 200) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 200) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 200) velocities[i3 + 2] *= -1;
      }

      (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      if (interactive) {
        const targetX = mousePos.normalizedX * 2 - 1;
        const targetY = -(mousePos.normalizedY * 2 - 1);

        camera.position.x += (targetX * 50 - camera.position.x) * 0.05;
        camera.position.y += (targetY * 50 - camera.position.y) * 0.05;

        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
      } else {
        particles.rotation.x += 0.00005;
        particles.rotation.y += 0.0001;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isReady, dimensions, particleCount, particleSize, speed, interactive, mousePos]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ParticleBackground;
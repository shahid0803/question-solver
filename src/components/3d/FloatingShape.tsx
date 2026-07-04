'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '@/lib/3d/useThreeScene';

interface FloatingShapeProps {
  className?: string;
  autoRotate?: boolean;
  scale?: number;
}

/**
 * Floating Animated Shapes Component
 * Creates 3D geometric shapes that float and rotate
 * Uses Three.js for 3D rendering
 *
 * Features:
 * - Smooth rotation animations
 * - Responsive sizing
 * - Multiple shape types
 * - Color gradients
 *
 * @example
 * <FloatingShape autoRotate={true} scale={1} />
 */
export const FloatingShape: React.FC<FloatingShapeProps> = ({
  className = '',
  autoRotate = true,
  scale = 1,
}) => {
  const { containerRef, isReady, dimensions } = useThreeScene();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shapeRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isReady || !containerRef.current || dimensions.width === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      dimensions.width / dimensions.height,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create rotating cube
    const geometry = new THREE.IcosahedronGeometry(20 * scale, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      wireframe: false,
      shininess: 100,
      opacity: 0.8,
      transparent: true,
    });

    const shape = new THREE.Mesh(geometry, material);
    shapeRef.current = shape;
    scene.add(shape);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x8b5cf6, 0.5);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (shapeRef.current && autoRotate) {
        shapeRef.current.rotation.x += 0.003;
        shapeRef.current.rotation.y += 0.005;
        shapeRef.current.rotation.z += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isReady, dimensions, scale, autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default FloatingShape;

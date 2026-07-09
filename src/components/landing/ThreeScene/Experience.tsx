'use client';

import CameraRig from './CameraRig';
import Lighting from './Lighting';
import FloatingPlatform from './FloatingPlatform';

export default function Experience() {
  return (
    <>
      <Lighting />

      <CameraRig>
        <FloatingPlatform />
      </CameraRig>
    </>
  );
}
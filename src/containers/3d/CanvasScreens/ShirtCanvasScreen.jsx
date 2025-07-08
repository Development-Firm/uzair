/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AccumulativeShadows, Center, Environment, OrbitControls, RandomizedLight } from '@react-three/drei';
import { useAppSelector } from '@/lib/store/hooks';
import { easing } from 'maath';
import { selectShirtDesignMap } from '@/lib/store/features/shirt/shirtSlice';
import * as THREE from 'three';

const ShirtCanvasScreen = ({ children }) => {
  const shirtColor = useAppSelector(selectShirtDesignMap)?.base?.color;

  return (
    <Canvas
      style={{ backgroundColor: 'white' }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      camera={{
        fov: 35,
        near: 0.1,
        far: 200,
        position: [0, 2, 6],
        zoom: 1,
      }}
      eventPrefix="client"
    >
      <ambientLight intensity={0.5 * Math.PI} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <Center>
        <Suspense fallback={null}>{children}</Suspense>
      </Center>
      <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={true}
        minDistance={3}
        maxDistance={10}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
      />
      {/* Background */}
      <Backdrop />

      {/* Planes */}
      {['Right', 'Left', 'Top', 'Bottom', 'Front'].map((plane, index) => (
        <mesh
          key={index}
          receiveShadow
          rotation={
            plane === 'Top' || plane === 'Bottom'
              ? [-Math.PI / 2, 0, 0]
              : plane === 'Right' || plane === 'Left'
                ? [0, -Math.PI / 2, 0]
                : [0, 0, 0]
          }
          position={
            plane === 'Top'
              ? [0, 15, 14.16]
              : plane === 'Bottom'
                ? [0, -15, 14.16]
                : plane === 'Right'
                  ? [15, 0, 14.16]
                  : plane === 'Left'
                    ? [-15, 0, 14.16]
                    : [0, 0, 29.16]
          }
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            color={shirtColor}
            opacity={0.3}
            transparent={true}
          />
        </mesh>
      ))}
    </Canvas>
  );
};

export default ShirtCanvasScreen;

function Backdrop() {
  const shirtColor = useAppSelector(selectShirtDesignMap)?.base?.color;
  const shadows = useRef(null);

  useFrame((state, delta) => {
    if (shadows.current) {
      easing.dampC(shadows.current.getMesh().material.color, shirtColor ? shirtColor : "#80C670", 0.25, delta);
    }
  });

  return (
    <group position={[0, 0, 0]} scale={6}>
      <AccumulativeShadows
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.85}
        scale={5}
        resolution={2048}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
      >
        <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
        <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
      </AccumulativeShadows>
    </group>
  );
}

/* eslint-disable react/no-unknown-property */
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import { ARButton, Interactive, useHitTest, useXR, XR } from "@react-three/xr";

const XrWatch = () => {
  const [xrSupported, setXrSupported] = useState(false);

  useEffect(() => {
    if (navigator.xr) {
      // Check if the device supports WebXR
      setXrSupported(true);
    } else {
      console.error("WebXR not supported on this device.");
      setXrSupported(false);
    }
  }, []);

  return (
    <>
      {xrSupported ? (
        <>
          <ARButton
            sessionInit={{
              requiredFeatures: ["hit-test", "camera"], // Ensure camera is requested for AR mode
              optionalFeatures: ["light-estimation"],  // Optional, depending on your needs
            }}
            onClick={() => {
              console.log('AR session started');
            }}
          />
          <Canvas shadows camera={{ position: [2, 10, 28], fov: 20 }}>
            <XR>
              <ambientLight intensity={1} />
              <Target />
              <OrbitControls makeDefault enableZoom={true} enablePan={true} />
            </XR>
          </Canvas>
        </>
      ) : (
        <div>
          <h2>WebXR is not supported on this device.</h2>
        </div>
      )}
    </>
  );
};

export default XrWatch;

const Target = () => {
  const reticleRef = useRef(null);
  const { isPresenting } = useXR();
  const [modelPosition, setModelPosition] = useState(null);

  const placeCube = (e) => {
    const position = e.intersection?.object?.position.clone() || [0, 0, 0];
    setModelPosition({ position, id: Date.now() });
  };


  const { camera } = useThree();
  useEffect(() => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  }, [isPresenting, camera]);

  useHitTest((hitMatrix) => {
    if (reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    }
  });

  return (
    <Interactive onSelect={placeCube}>
      {isPresenting ? (
        <CubeModel position={modelPosition?.position || [0, 0, 0]} />
      ) : (
        <CubeModel position={[0, 0, 4]} />
      )}
      {isPresenting && (
        <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.25, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      )}
    </Interactive>
  );
};

const CubeModel = ({ position }) => {
  const cubeRef = useRef(null);
  return (
    <mesh ref={cubeRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

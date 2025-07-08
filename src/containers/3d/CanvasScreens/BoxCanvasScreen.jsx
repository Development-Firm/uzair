/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SoftShadows } from "@react-three/drei";

const BoxCanvasScreen = ({ children }) => {
  const orbitRef = useRef(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transition: "all 0.4s",
        background:'#363636'
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
        }}
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
      >
        {/* FRONT */}
        <directionalLight castShadow position={[2, 0, 4]} intensity={0.7} />
        <directionalLight castShadow position={[0, -1, 4]} intensity={0.7} />
        {/* BACK */}
        <directionalLight position={[-2, 0, -4]} intensity={1} />
        {/* TOP */}
        <directionalLight castShadow position={[0, 5, 0]} intensity={0.2} />
        {/* BOTTOM */}
        <directionalLight position={[0, -3, 0]} intensity={1.6} />
        {/* RIGHT */}
        <directionalLight position={[4, 1, -0.5]} intensity={1} />
        {/* LEFT */}
        <directionalLight position={[-4, 1, 0]} intensity={1} />

        <ambientLight intensity={0.5} />

        {/* Shadows */}
        <SoftShadows size={0} samples={10} focus={0} />

        {/* Plane */}
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1b1c23" />
        </mesh>

        {/* Orbit Controls */}
        <OrbitControls
          ref={orbitRef}
          makeDefault
          enableZoom={true}
          enablePan={true}
        />

        {children}
      </Canvas>
    </div>
  );
};

export default BoxCanvasScreen;

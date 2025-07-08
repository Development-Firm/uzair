/* eslint-disable react/no-unknown-property */
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLight,
} from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  Selection,
} from "@react-three/postprocessing";

const WatchCanvasScreen = ({ children }) => {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      camera={{ position: [2, 10, 28], fov: 20 }}
    >
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <group position={[0.25, -1, 0]}>
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline
              visibleEdgeColor="#122830d6"
              hiddenEdgeColor="#122830d6"
              blur
              edgeStrength={20}
            />
          </EffectComposer>
          {children}
        </Selection>
        <AccumulativeShadows
          temporal
          frames={100}
          scale={19}
          alphaTest={0.8}
          position={[0, -2.3, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={10}
            ambient={0.5}
            position={[2.5, 10, -5]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      <Environment preset="city" background backgroundBlurriness={1} />
      <OrbitControls makeDefault enableZoom={true} enablePan={true} />
    </Canvas>
  );
};

export default WatchCanvasScreen;

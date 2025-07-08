import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  Grid,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  Outline,
  Selection,
} from "@react-three/postprocessing";
import { easing } from "maath";

const SofaCanvasScreen = ({ children }) => {
  return (
    <Canvas
      flat
      shadows
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      camera={{ position: [-15, 0, 10], fov: 25 }}
    >
      {/* <fog attach="fog" args={['black', 15, 22.5]} />
      <Stage intensity={0.5} environment="city" shadows={{ type: 'accumulative', bias: -0.001, intensity: Math.PI }} adjustCamera={false}>
      </Stage> */}
      <ambientLight intensity={0.5} />
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
      <Grid
        renderOrder={-1}
        position={[0, -1.6, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={30}
      />
      <OrbitControls autoRotate autoRotateSpeed={0.05} makeDefault />
      {/* <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={2} mipmapBlur />
        <ToneMapping />
      </EffectComposer> */}
      <Environment background preset="sunset" blur={0.8} />
    </Canvas>
  );
};

export default SofaCanvasScreen;

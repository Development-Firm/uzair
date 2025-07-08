'use client';

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useAppSelector } from '@/lib/store/hooks';
import { selectWatchColor, selectWatchFace, selectWatchStrap } from '@/lib/store/features/watch/watchSlice';

export function Watch({ scale = 1, ...props }) {
  const group = useRef(null);
  const { nodes, materials } = useGLTF('/assets/models/watch/watch.glb');

  const watchFace = useAppSelector(selectWatchFace);
  const watchStrap = useAppSelector(selectWatchStrap);
  const watchColor = useAppSelector(selectWatchColor);

  return (
    <group ref={group} scale={scale} {...props} dispose={null} key={watchFace}>
      {watchFace === 'rectangle' ? (
        <>
          {/* Rectangle Face */}
          <group position={[-0.026, 1.016, 2.159]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.object_17001.geometry}
              material={materials.White}
            >
              {watchColor !== 'none' && (
                <meshPhysicalMaterial color={watchColor} metalness={0.8} roughness={0.2} />
              )}
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.object_17001_1.geometry}
              material={materials['Body Dial']}
            >
              {watchColor !== 'none' && (
                <meshPhysicalMaterial color={watchColor} metalness={0.8} roughness={0.2} />
              )}
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.object_17001_2.geometry}
              material={materials['Home Screen']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.object_17001_3.geometry}
              material={materials['Body Dial']}
            >
              {watchColor !== 'none' && (
                <meshPhysicalMaterial color={watchColor} metalness={0.8} roughness={0.2} />
              )}
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.object_17001_4.geometry}
              material={materials['Lever Ring']}
            />
          </group>

          {/* Rectangle Straps */}
          {watchStrap === 'black' && (
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Strap_1_Square.geometry}
              material={materials['Strap 1']}
              rotation={[Math.PI / 2, 0, 0]}
            >
              {watchColor !== 'none' && <meshPhysicalMaterial color={watchColor} />}
            </mesh>
          )}

          {watchStrap === 'orange' && (
            <group position={[-0.004, 1.003, 1.508]} rotation={[-0.628, 0, 0]} scale={0.101}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Strap_Rubber_0001.geometry}
                material={materials['Strap 2']}
              >
                {watchColor !== 'none' && <meshPhysicalMaterial color={watchColor} />}
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Strap_Rubber_0001_1.geometry}
                material={materials.Knot}
              />
            </group>
          )}
        </>
      ) : (
        <>
          {/* Round Dial */}
          <group position={[0, 1.139, 1.732]} rotation={[0.953, 0, 0]} scale={[2.265, 0.406, 2.265]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder.geometry}
              material={materials['Body Dial']}
            >
              {watchColor !== 'none' && (
                <meshPhysicalMaterial color={watchColor} metalness={0.8} roughness={0.2} />
              )}
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder_1.geometry}
              material={materials['Home Screen']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder_2.geometry}
              material={materials['Lever Ring']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cylinder_3.geometry}
              material={materials.Bezels}
            />
          </group>

          {/* Round Straps */}
          {watchStrap === 'black' && (
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Strap_1_Round.geometry}
              material={materials['Strap 1']}
              rotation={[Math.PI / 2, 0, 0]}
            >
              {watchColor !== 'none' && <meshPhysicalMaterial color={watchColor} />}
            </mesh>
          )}

          {watchStrap === 'orange' && (
            <>
              <group position={[-0.038, 0.967, 1.538]} rotation={[-0.58, 0, 0]} scale={0.089}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Rivet_Iron_Clean2_0.geometry}
                  material={materials.Knot}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Rivet_Iron_Clean2_0_1.geometry}
                  material={materials['Strap 2']}
                >
                  {watchColor !== 'none' && <meshPhysicalMaterial color={watchColor} />}
                </mesh>
              </group>
              <group position={[-0.038, 0.967, 1.538]} rotation={[-0.58, 0, 0]} scale={0.089}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Rivet_Iron_Clean2_0001.geometry}
                  material={materials.Knot}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Rivet_Iron_Clean2_0001_1.geometry}
                  material={materials['Strap 2']}
                >
                  {watchColor !== 'none' && <meshPhysicalMaterial color={watchColor} />}
                </mesh>
              </group>
            </>
          )}
        </>
      )}
    </group>
  );
}

useGLTF.preload('/assets/models/watch/watch.glb');

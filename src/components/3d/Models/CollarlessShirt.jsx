import React, { useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { SRGBColorSpace } from 'three';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  selectSelectedShirtDesign,
  selectSelectedShirtLayer,
  selectShirtColor,
  selectShirtDesignMap,
  setSelectedShirtLayer,
  setShirtDesignMap,
} from '@/lib/store/features/shirt/shirtSlice';
import * as THREE from 'three';

export function CollarlessShirt(props) {
  const { nodes, materials } = useGLTF('/assets/models/collarless-shirt/collarless-shirt.glb');

  const dispatch = useAppDispatch();
  const selectedShirtDesign = useAppSelector(selectSelectedShirtDesign);
  const selectedShirtLayer = useAppSelector(selectSelectedShirtLayer);
  const shirtDesignMap = useAppSelector(selectShirtDesignMap);

  const baseTexturePath =
    shirtDesignMap?.base?.texture || '/assets/models/collarless-shirt/textures/texture-7.webp';
  const baseTexture = useTexture(baseTexturePath);

  baseTexture.colorSpace = SRGBColorSpace;
  baseTexture.flipY = true;
  baseTexture.wrapS = THREE.RepeatWrapping;
  baseTexture.wrapT = THREE.RepeatWrapping;
  baseTexture.repeat.set(-1, 1);

  const neckTexturePath =
    shirtDesignMap?.neck?.texture || '/assets/models/collarless-shirt/textures/texture-1.jpg';
  const neckTexture = useTexture(neckTexturePath);
  neckTexture.colorSpace = SRGBColorSpace;
  neckTexture.flipY = false;
  neckTexture.wrapS = THREE.RepeatWrapping;
  neckTexture.wrapT = THREE.RepeatWrapping;


  console.log("Base texture...", shirtDesignMap?.base?.texture)



  const shirtColor = useAppSelector(selectShirtColor);

  useEffect(() => {
    let obj;
    if (shirtColor) {
      obj = {
        color: shirtColor,
        texture: '',
      };
    } else {
      obj = {
        color: '',
        texture: selectedShirtDesign?.url || '',
      };
    }
    const newShirtDesignMap = {
      ...shirtDesignMap,
      [selectedShirtLayer]: obj,
    };
    dispatch(setShirtDesignMap(newShirtDesignMap));
  }, [shirtColor, selectedShirtDesign, selectedShirtLayer]);

  return (
    <group {...props} dispose={null} key={shirtDesignMap}>
      <group position={[0.008, -0.017, 0.047]} scale={3.888}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Collarless.geometry}
          material={materials['Collorless Body']}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedShirtLayer('innerstrip'));
          }}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Collarless_1.geometry}
          material={materials['Collorless Neck']}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedShirtLayer('neck'));
          }}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Collarless_2.geometry}
          material={materials['New Material']}
          renderOrder={1}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedShirtLayer('base'));
          }}
        >
          <meshPhysicalMaterial
            map={!shirtDesignMap?.base?.color ? baseTexture : null}
            side={THREE.DoubleSide}
            color={shirtDesignMap?.base?.color || ''}
          />
        </mesh>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Logo_Collorless.geometry}
        material={materials.Logo}
        position={[0.351, 0.768, 0.425]}
        rotation={[1.257, 0, -0.153]}
        scale={[0.344, 0.001, 0.18]}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedShirtLayer('logo'));
        }}
      />
    </group>
  );
}

useGLTF.preload('/assets/models/collarless-shirt/collarless-shirt.glb');

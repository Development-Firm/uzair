import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import {
  selectCurrentLayer,
  selectTableDesignMap,
  selectTableShieldColor,
  setCurrentLayer,
  setTableDesignMap,
} from "@/lib/store/features/table/tableSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Select } from "@react-three/postprocessing";

export function TableLg(props) {
  const { nodes, materials } = useGLTF("/assets/models/table/table-lg.glb");

  const tableShieldColor = useAppSelector(selectTableShieldColor);
  const dispatch = useAppDispatch();
  const currentLayer = useAppSelector(selectCurrentLayer);
  const tableDesignMap = useAppSelector(selectTableDesignMap);

  const [hovered, setHovered] = useState({});

  const handleCurrentLayer = (e, layer) => {
    e.stopPropagation();
    dispatch(setCurrentLayer(layer));
  };

  const handleHover = (event, meshName, status) => {
    event.stopPropagation();
    setHovered((prev) => ({
      ...prev,
      [meshName]: status,
    }));
    document.body.style.cursor = status ? "pointer" : "auto";
  };

  useEffect(() => {
    const newDesignMap = {
      ...tableDesignMap,
      [currentLayer]: {
        color: tableShieldColor,
      },
    };
    dispatch(setTableDesignMap(newDesignMap));
  }, [tableShieldColor]);

  return (
    <group {...props} dispose={null} key={tableShieldColor}>
      <group position={[-0.552, 1.328, -0.002]} scale={[1, 0.39, 0.029]}>
        <Select enabled={hovered["shield"]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials["Desk Spaces"]}
            onClick={(e) => handleCurrentLayer(e, "shield")}
            onPointerOver={(e) => handleHover(e, "shield", true)}
            onPointerOut={(e) => handleHover(e, "shield", false)}
          >
            {tableDesignMap?.shield?.color && (
              <meshPhysicalMaterial color={tableDesignMap?.shield?.color} />
            )}
          </mesh>
        </Select>
        <Select enabled={hovered["shieldSupport"]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials.Legs}
            onClick={(e) => handleCurrentLayer(e, "shieldSupport")}
            onPointerOver={(e) => handleHover(e, "shieldSupport", true)}
            onPointerOut={(e) => handleHover(e, "shieldSupport", false)}
          >
            {tableDesignMap?.shieldSupport?.color && (
              <meshPhysicalMaterial
                color={tableDesignMap?.shieldSupport?.color}
              />
            )}
          </mesh>
        </Select>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials.Legs}
        />
      </group>
      <Select enabled={hovered["centralSupport"]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Inner_Big.geometry}
          material={materials.Legs}
          position={[-0.454, 1.087, -0.006]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={1.468}
          onClick={(e) => handleCurrentLayer(e, "centralSupport")}
          onPointerOver={(e) => handleHover(e, "centralSupport", true)}
          onPointerOut={(e) => handleHover(e, "centralSupport", false)}
        >
          {tableDesignMap?.centralSupport?.color && (
            <meshPhysicalMaterial
              color={tableDesignMap?.centralSupport?.color}
            />
          )}
        </mesh>
      </Select>
      <Select enabled={hovered["base"]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Upper_Big.geometry}
          material={materials["white1.003"]}
          position={[-0.454, 1.088, -0.006]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={1.468}
          onClick={(e) => handleCurrentLayer(e, "base")}
          onPointerOver={(e) => handleHover(e, "base", true)}
          onPointerOut={(e) => handleHover(e, "base", false)}
        >
          {tableDesignMap?.base?.color && (
            <meshPhysicalMaterial color={tableDesignMap?.base?.color} />
          )}
        </mesh>
      </Select>
      <Select enabled={hovered["legs"]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Legs_Big.geometry}
          material={materials.Legs}
          position={[-0.412, 0.576, -0.008]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={1.468}
          onClick={(e) => handleCurrentLayer(e, "legs")}
          onPointerOver={(e) => handleHover(e, "legs", true)}
          onPointerOut={(e) => handleHover(e, "legs", false)}
        >
          {tableDesignMap?.legs?.color && (
            <meshPhysicalMaterial color={tableDesignMap?.legs?.color} />
          )}
        </mesh>
      </Select>
    </group>
  );
}

useGLTF.preload("/assets/models/table/table-lg.glb");

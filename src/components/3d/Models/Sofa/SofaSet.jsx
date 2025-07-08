import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectCurrentSofaColor,
  selectCurrentSofaLayer,
  selectSofaDesignMap,
  setCurrentSofaLayer,
  setSofaDesignMap,
} from "@/lib/store/features/sofa/sofaSlice";
import { Select } from "@react-three/postprocessing";

export function SofaSet(props) {
  const { nodes, materials } = useGLTF("/assets/models/sofa/sofa-set.glb");
  const dispatch = useAppDispatch();
  const currentSofaLayer = useAppSelector(selectCurrentSofaLayer);
  const sofaDesignMap = useAppSelector(selectSofaDesignMap);
  const currentSofaColor = useAppSelector(selectCurrentSofaColor);

  // State to track hovered status of each mesh
  const [hovered, setHovered] = useState({});

  // Function to handle hover status and cursor style
  const handleHover = (event, meshName, status) => {
    event.stopPropagation();
    setHovered((prev) => ({
      ...prev,
      [meshName]: status,
    }));
    document.body.style.cursor = status ? "pointer" : "auto";
  };

  const handleCurrentLayer = (e, layer) => {
    e.stopPropagation();
    dispatch(setCurrentSofaLayer(layer));
  };

  useEffect(() => {
    const newDesignMap = {
      ...sofaDesignMap,
      [currentSofaLayer]: {
        color: currentSofaColor,
      },
    };
    dispatch(setSofaDesignMap(newDesignMap));
  }, [currentSofaColor]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.808, 0.575, 0.91]}>
        <Select enabled={hovered["sofa"]}>
          <mesh
            geometry={nodes.Mesh002.geometry}
            material={materials.Sofa}
            onClick={(e) => handleCurrentLayer(e, "sofa")}
            onPointerOver={(e) => handleHover(e, "sofa", true)}
            onPointerOut={(e) => handleHover(e, "sofa", false)}
          >
            {sofaDesignMap?.sofa?.color && (
              <meshPhysicalMaterial color={sofaDesignMap?.sofa?.color} />
            )}
          </mesh>
        </Select>
        <Select enabled={hovered["legs"]}>
          <mesh
            geometry={nodes.Mesh002_1.geometry}
            material={materials.Metal}
            onClick={(e) => handleCurrentLayer(e, "legs")}
            onPointerOver={(e) => handleHover(e, "legs", true)}
            onPointerOut={(e) => handleHover(e, "legs", false)}
          >
            {sofaDesignMap?.legs?.color && (
              <meshPhysicalMaterial color={sofaDesignMap?.legs?.color} />
            )}
          </mesh>
        </Select>
      </group>
      <Select enabled={hovered["cushion"]}>
        <mesh
          geometry={nodes.Cushion_Square.geometry}
          material={materials["Pillows Cushions"]}
          position={[-0.73, 0.968, 0.981]}
          rotation={[-Math.PI / 2, -1.309, -Math.PI / 2]}
          onClick={(e) => handleCurrentLayer(e, "cushion")}
          onPointerOver={(e) => handleHover(e, "cushion", true)}
          onPointerOut={(e) => handleHover(e, "cushion", false)}
        >
          {sofaDesignMap?.cushion?.color && (
            <meshPhysicalMaterial color={sofaDesignMap?.cushion?.color} />
          )}
        </mesh>
      </Select>
      <Select enabled={hovered["cushion"]}>
        <mesh
          geometry={nodes.Seats.geometry}
          material={materials["Pillows Cushions"]}
          position={[-0.704, 0.692, 1.012]}
          onClick={(e) => handleCurrentLayer(e, "cushion")}
          onPointerOver={(e) => handleHover(e, "cushion", true)}
          onPointerOut={(e) => handleHover(e, "cushion", false)}
        >
          {sofaDesignMap?.cushion?.color && (
            <meshPhysicalMaterial color={sofaDesignMap?.cushion?.color} />
          )}
        </mesh>
      </Select>
    </group>
  );
}

useGLTF.preload("/assets/models/sofa/sofa-set.glb");

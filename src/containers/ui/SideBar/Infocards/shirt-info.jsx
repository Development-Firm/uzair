import { selectShirtDesignMap } from "@/lib/store/features/shirt/shirtSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const ShirtInfo = () => {
    const shirtDesignMap = useAppSelector(selectShirtDesignMap)
    
    
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* <div>Texture: {shirtDesignMap?.base?.texture}</div> */}
      <div>
        Shirt Color:{" "}
        <span style={{ backgroundColor: shirtDesignMap?.base?.color }}>
          {shirtDesignMap?.base?.color}
        </span>
      </div>
    </div>
  );
};

export default ShirtInfo;

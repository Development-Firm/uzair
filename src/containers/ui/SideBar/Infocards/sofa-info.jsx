import {
  selectSofaDesignMap,
  selectSofaType,
} from "@/lib/store/features/sofa/sofaSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const SofaInfo = () => {
  const sofaType = useAppSelector(selectSofaType);
  const sofaDesignMap = useAppSelector(selectSofaDesignMap);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>Size: {sofaType}</div>
      <div>
        Sofa Color:{" "}
        <span style={{ backgroundColor: sofaDesignMap?.sofa?.color }}>
          {sofaDesignMap?.sofa?.color}
        </span>
      </div>
      <div>
        Cushion Color:{" "}
        <span style={{ backgroundColor: sofaDesignMap?.cushion?.color }}>
          {sofaDesignMap?.cushion?.color}
        </span>
      </div>
      <div>
        Legs Color:{" "}
        <span style={{ backgroundColor: sofaDesignMap?.legs?.color }}>
          {sofaDesignMap?.legs?.color}
        </span>
      </div>
    </div>
  );
};

export default SofaInfo;

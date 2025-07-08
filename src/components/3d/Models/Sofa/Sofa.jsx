import React from "react";
import { SofaSet } from "./SofaSet";
import { SofaOne } from "./SofaOne";
import { useAppSelector } from "@/lib/store/hooks";
import { selectSofaType } from "@/lib/store/features/sofa/sofaSlice";

const Sofa = () => {
  const sofaType = useAppSelector(selectSofaType);

  if (sofaType === "sofa-set") {
    return <SofaSet scale={1.5}  position={[0,-1.5,-1]} />;
  } else {
    return <SofaOne scale={2}  position={[0,-1.5,0]}/>;
  }
};

export default Sofa;

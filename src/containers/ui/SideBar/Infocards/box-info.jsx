
import { selectBoxCoating, selectBoxColor, selectBoxDimensions, selectBoxPattern } from "@/lib/store/features/box/boxSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const BoxInfo = () => {

  const boxColor = useAppSelector(selectBoxColor)
  const boxPattern = useAppSelector(selectBoxPattern)
  const boxCoating = useAppSelector(selectBoxCoating)
  const dimension  = useAppSelector(selectBoxDimensions)

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        Box Color:{" "}
        <span style={{ backgroundColor: boxColor }}>{boxColor}</span>
      </div>
      <div>Pattern: {boxPattern}</div>
      <div>Coating: {boxCoating}</div>
      <div>Dimension: {dimension?.length}{" "}{dimension?.unit} {dimension?.breadth}{" "}{dimension?.unit} {dimension?.height}{" "}{dimension?.unit}</div>
    </div>
  );
};

export default BoxInfo;

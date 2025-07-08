import {
  selectWatchColor,
  selectWatchFace,
  selectWatchStrap,
} from "@/lib/store/features/watch/watchSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const WatchInfo = () => {
  const watchColor = useAppSelector(selectWatchColor);
  const watchStrap = useAppSelector(selectWatchStrap);
  const watchFace = useAppSelector(selectWatchFace);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        Watch Color:{" "}
        <span style={{ backgroundColor: watchColor }}>{watchColor}</span>
      </div>
      <div>Watch Strap: {watchStrap}</div>
      <div>Watch Face: {watchFace}</div>
    </div>
  );
};

export default WatchInfo;

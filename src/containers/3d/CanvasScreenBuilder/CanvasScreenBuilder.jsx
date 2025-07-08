import { selectSelectedModel } from "@/lib/store/features/general/generalSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";
import {
  BoxCanvasScreen,
  ShirtCanvasScreen,
  WatchCanvasScreen,
} from "../CanvasScreens";
import SofaCanvasScreen from "../CanvasScreens/SofaCanvasScreen";

const CanvasScreenBuilder = ({ children }) => {
  const selectedModel = useAppSelector(selectSelectedModel);

  if (selectedModel === "flat-box") {
    return <BoxCanvasScreen>{children}</BoxCanvasScreen>;
  } else if (selectedModel === "watch") {
    return <WatchCanvasScreen>{children}</WatchCanvasScreen>;
  } else if (selectedModel === "table") {
    return <WatchCanvasScreen>{children}</WatchCanvasScreen>;
  } else if (selectedModel === "collarless-shirt") {
    return <ShirtCanvasScreen>{children}</ShirtCanvasScreen>;
  } else if (selectedModel === "collared-shirt") {
    return <ShirtCanvasScreen>{children}</ShirtCanvasScreen>;
  } else if (selectedModel === "sofa") {
    return <SofaCanvasScreen>{children}</SofaCanvasScreen>;
  } else {
    return <WatchCanvasScreen>{children}</WatchCanvasScreen>;
  }
};

export default CanvasScreenBuilder;

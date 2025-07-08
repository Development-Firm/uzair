import { CollaredShirt } from "@/components/3d/Models/CollaredShirt";
import { FlatBox } from "@/components/3d/Models/FlatBox";
import { CollarlessShirt } from "@/components/3d/Models/CollarlessShirt";
import { Watch } from "@/components/3d/Models/Watch";
import { selectSelectedModel } from "@/lib/store/features/general/generalSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React, { Suspense } from "react";
import Table from "@/components/3d/Models/Table";
import ModelLoader from "@/components/ui/model-loader";
import Sofa from "@/components/3d/Models/Sofa";
import {
  BoxCanvasScreen,
  ShirtCanvasScreen,
  WatchCanvasScreen,
} from "../CanvasScreens";
import SofaCanvasScreen from "../CanvasScreens/SofaCanvasScreen";

const ModelBuilder = () => {
  const selectedModel = useAppSelector(selectSelectedModel);

  if (selectedModel === "flat-box") {
    return (
      <BoxCanvasScreen>
        <Suspense fallback={<ModelLoader />}>
          <FlatBox scale={9} />
        </Suspense>
      </BoxCanvasScreen>
    );
  } else if (selectedModel === "watch") {
    return (
      <WatchCanvasScreen>
        <Suspense fallback={<ModelLoader />}>
          <Watch position={[0, 1.5, 0]} rotation={[0, 0, 0]} />
        </Suspense>
      </WatchCanvasScreen>
    );
  } else if (selectedModel === "collarless-shirt") {
    return (
      <ShirtCanvasScreen>
        <Suspense fallback={<ModelLoader />}>
          <CollarlessShirt scale={1} position={[0, 0, 0]} />
        </Suspense>
      </ShirtCanvasScreen>
    );
  } else if (selectedModel === "table") {
    return (
      <WatchCanvasScreen>
        <Suspense fallback={<ModelLoader />}>
          <Table />
        </Suspense>
      </WatchCanvasScreen>
    );
  } else if (selectedModel === "collared-shirt") {
    return (
      <ShirtCanvasScreen>
        <Suspense fallback={<ModelLoader />}>
          <CollaredShirt scale={1} />
        </Suspense>
      </ShirtCanvasScreen>
    );
  } else if (selectedModel === "sofa") {
    return (
      <SofaCanvasScreen>
        <Suspense fallback={<ModelLoader />}>
          <Sofa />
        </Suspense>
      </SofaCanvasScreen>
    );
  } else {
    return <>No model selected</>;
  }
};

export default ModelBuilder;

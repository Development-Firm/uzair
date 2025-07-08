"use client";
import React, { useEffect, useState } from "react";
import { Box, Camera, Fullscreen, Info, MoonStar } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import { useAppSelector } from "@/lib/store/hooks";
import { selectSelectedModel } from "@/lib/store/features/general/generalSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BoxInfo, SofaInfo, WatchInfo } from "./Infocards";
import TableInfo from "./Infocards/table-info";
import ShirtInfo from "./Infocards/shirt-info";

const SideBar = () => {
  const currentModel = useAppSelector(selectSelectedModel);
  const modelsWithAnimation = ["flat-box"];
  const [modelHasAnimation, setModelHasAnimation] = useState(false);

  useEffect(() => {
    if (modelsWithAnimation.includes(currentModel)) {
      setModelHasAnimation(true);
    } else {
      setModelHasAnimation(false);
    }
  }, [currentModel]);

  const handleFullscreen = () => {
    const body = document.querySelector("#root");
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      if (body.requestFullscreen) {
        body.requestFullscreen();
      } else if (body.webkitRequestFullscreen) {
        body.requestFullscreen();
      }

      console.log("Open full screen");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      console.log("Close full screen");
    }
  };

  const captureCanvasHandler = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "canvas.png");
    const canvas = document.querySelector("canvas");
    if (canvas) {
      link.setAttribute(
        "href",
        canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      );
      link.click();
    } else {
      alert("Select a canvas first");
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-primary/30 dark:bg-foreground/25 p-2 rounded-full">
      <IconButton onClick={handleFullscreen}>
        <Fullscreen />
      </IconButton>
      {/* {modelHasAnimation && (
        <IconButton>
          <Box />
          <PackageOpen />
        </IconButton>
      )} */}
      {/* <IconButton>
        <MoonStar />
        <Sun />
      </IconButton> */}
      <IconButton onClick={captureCanvasHandler}>
        <Camera />
      </IconButton>
      <Popover>
        <PopoverTrigger>
          <IconButton>
            <Info />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className="card-gradient text-primary-foreground border-none"
          sideOffset={10}
        >
          <h1 className="text-lg font-semibold mb-2">Info:</h1>
          {/* <SofaInfo/> */}
          {/* <TableInfo/> */}
          {/* <WatchInfo/> */}
          {/* <ShirtInfo/> */}
          <BoxInfo />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SideBar;

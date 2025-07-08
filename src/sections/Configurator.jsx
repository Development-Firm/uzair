"use client";
import React from "react";
import SideBar from "@/containers/ui/SideBar";
import TopBar from "@/containers/ui/TopBar/TopBar";
import ModelBuilder from "@/containers/3d/ModelBuilder";
import MenuBuilder from "@/containers/ui/MenuBuilder";
import Canvas2D from "@/containers/ui/Canvas2D";
import CanvasScreenBuilder from "@/containers/3d/CanvasScreenBuilder";
const Configurator = () => {
  return (
    <div className="h-full relative bg-background">
      <div className="absolute w-full pt-[1rem] mx-10 z-10">
        <TopBar />
      </div>
      <div className="absolute left-8 top-[30%] z-10">
        <SideBar />
      </div>
      <div className="absolute right-12 pt-[1rem] z-10">
        <MenuBuilder />
      </div>
      <ModelBuilder />
      {/* <Canvas2D /> */}
    </div>
  );
};

export default Configurator;

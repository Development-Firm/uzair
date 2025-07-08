"use client";
import dynamic from "next/dynamic";
import { selectSelectedModel } from "@/lib/store/features/general/generalSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";
import Configurator from "@/sections/Configurator";

export default function Page() {
  const selectedModel = useAppSelector(selectSelectedModel);

  if (selectedModel !== "flat-box") {
    return (
      <div className="h-full relative">
        <Configurator />
      </div>
    );
  } else {
    return (
      <div className="h-full relative dark">
        <Configurator />
      </div>
    );
  }
}

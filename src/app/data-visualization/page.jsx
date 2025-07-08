'use client'
import StarsCanvas from "@/components/3d/stars";
import IconButton from "@/components/ui/icon-button";
import DataVisualization from "@/sections/DataVisualization";
import { ChevronLeft } from "lucide-react";
import { useRouter } from 'next/navigation'
import React from "react";

const Page = () => {
  const router = useRouter()


  return (
    <div className="relative min-h-full max-h-fit bg-primary overflow-hidden">
      <div className="relative z-20">
      <IconButton onClick={() => router.push("/")} className="m-4">
        <ChevronLeft />
      </IconButton>
      <DataVisualization />
      </div>
      <StarsCanvas />
    </div>
  );
};

export default Page;

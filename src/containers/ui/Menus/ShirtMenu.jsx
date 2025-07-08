"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircleGrid from "@/components/ui/circle-grid";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import ImageUpload from "@/components/ui/image-uploader";
import {
  selectSelectedShirtDesign,
  selectShirtColor,
  selectShirtDesigns,
  setSelectedShirtDesign,
  setShirtColor,
  setShirtDesigns,
} from "@/lib/store/features/shirt/shirtSlice";
import ColorSection from "@/components/ui/color-section";
import { shirtDesignTemplates } from "@/lib/data";

const ShirtMenu = () => {
  const dispatch = useAppDispatch();

  const colorChangeHandler = (value) => {
    dispatch(setSelectedShirtDesign(""));
    dispatch(setShirtColor(value));
  };

  const setShirtDesignTemplate = (item) => {
    dispatch(setShirtColor(""));
    dispatch(setSelectedShirtDesign(item));
  };

  const selectedShirtDesign = useAppSelector(selectSelectedShirtDesign);
  const shirtDesigns = useAppSelector(selectShirtDesigns);
  const shirtColor = useAppSelector(selectShirtColor);

  return (
    <div className="bg-transparent rounded-xl">
      <Tabs defaultValue="colors" style={{ minWidth: "350px" }}>
        <TabsList
          className="p-6 bg-primary/30"
          style={{
            borderRadius: "30px",
          }}
        >
          <TabsTrigger
            value="colors"
            className="px-3 py-3 rounded-full bg-transparent text-primary-foreground"
          >
            Colors
          </TabsTrigger>
          <TabsTrigger
            value="designs"
            className="px-3 py-3 rounded-full bg-transparent text-primary-foreground"
          >
            Designs
          </TabsTrigger>
          <TabsTrigger
            value="upload-design"
            className="px-3 py-3 rounded-full bg-transparent text-primary-foreground"
          >
            Upload Design
          </TabsTrigger>
        </TabsList>
        <div
          style={{
            borderRadius: "30px",
          }}
          className="card-gradient p-4 shadow-lg mt-2"
        >
          <TabsContent value="colors">
            <ColorSection
              value={shirtColor}
              onChange={(value) => colorChangeHandler(value)}
              resetHandler={() => dispatch(setShirtColor(""))}
            />
          </TabsContent>
          <TabsContent value="designs">
            <CircleGrid
              data={shirtDesignTemplates}
              onClick={(item) => setShirtDesignTemplate(item)}
              selectedItemValue={selectedShirtDesign}
            />
          </TabsContent>
          <TabsContent value="upload-design">
            <ImageUpload
              files={shirtDesigns}
              setFiles={(files) => dispatch(setShirtDesigns(files))}
              selectedFile={selectedShirtDesign}
              setSelectedFile={(file) => {
                dispatch(setSelectedShirtDesign(file));
                dispatch(setShirtColor(""));
              }}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ShirtMenu;

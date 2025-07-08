"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircleGrid from "@/components/ui/circle-grid";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import ColorSection from "@/components/ui/color-section";
import { selectCurrentSofaColor, selectSofaType, setCurrentSofaColor, setSofaType } from "@/lib/store/features/sofa/sofaSlice";
import { sofaTypes } from "@/lib/data";

const SofaMenu = () => {
  const dispatch = useAppDispatch();

  const colorChangeHandler = (value) => {
    dispatch(setCurrentSofaColor(value));
  };

  const sizeClickHandler = (item) => {
    dispatch(setSofaType(item?.value));
  };

  const selectedSofaType = useAppSelector(selectSofaType);

  const sofaCurrentColor = useAppSelector(selectCurrentSofaColor);

  return (
    <div className="bg-transparent rounded-xl">
      <Tabs defaultValue="colors" style={{ minWidth: "350px" }}>
        <TabsList
          className="p-6 bg-primary/30"
          style={{
            borderRadius: "30px",
          }}
        >
          <TabsTrigger value="colors" className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Colors</TabsTrigger>
          <TabsTrigger value="sizes" className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Sizes</TabsTrigger>
        </TabsList>
        <div
          style={{
            borderRadius: "30px",
          }}
          className="card-gradient p-4 shadow-lg mt-2"
        >
          <TabsContent value="sizes">
            <CircleGrid
              data={sofaTypes}
              onClick={sizeClickHandler}
              selectedItemValue={selectedSofaType}
            />
          </TabsContent>
          <TabsContent value="colors">
            <ColorSection
              value={sofaCurrentColor}
              onChange={(value) => colorChangeHandler(value)}
              resetHandler={() => dispatch(setCurrentSofaColor(""))}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SofaMenu;

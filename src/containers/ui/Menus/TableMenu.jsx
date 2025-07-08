"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CircleGrid from "@/components/ui/circle-grid";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import ColorSection from "@/components/ui/color-section";
import { tableSizes, watchStraps } from "@/lib/data";
import {
  selectTableShieldColor,
  selectTableSize,
  setTableShieldColor,
  setTableSize,
} from "@/lib/store/features/table/tableSlice";

const TableMenu = () => {
  const dispatch = useAppDispatch();

  const colorChangeHandler = (value) => {
    dispatch(setTableShieldColor(value));
  };

  const sizeClickHandler = (item) => {
    dispatch(setTableSize(item?.value));
  };

  const tableSize = useAppSelector(selectTableSize);

  const tableShieldColor = useAppSelector(selectTableShieldColor);

  return (
    <div className="bg-transparent rounded-xl">
      <Tabs defaultValue="colors" style={{ minWidth: "350px" }} >
        <TabsList
          className="p-6 bg-primary/30"
          style={{
            borderRadius: "30px",
          }}
        >
          <TabsTrigger className="px-3 py-3 rounded-full bg-transparent text-primary-foreground" value="colors">Colors</TabsTrigger>
          <TabsTrigger className="px-3 py-3 rounded-full bg-transparent text-primary-foreground" value="sizes">Sizes</TabsTrigger>
        </TabsList>
        <div
          style={{
            borderRadius: "30px",
          }}
          className="card-gradient p-4 shadow-lg mt-2"
        >
          <TabsContent value="sizes">
            <CircleGrid
              data={tableSizes}
              onClick={sizeClickHandler}
              selectedItemValue={tableSize}
            />
          </TabsContent>
          <TabsContent value="colors">
            <ColorSection
              value={tableShieldColor}
              onChange={(value) => colorChangeHandler(value)}
              resetHandler={() => dispatch(setTableShieldColor(""))}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TableMenu;

"use client";
import {
  Bar3DChart,
  FlightGlobe,
  Scatter3DChart,
  StackedBar3DChart,
} from "@/components/charts";
import { selectCurrentDataVisualization } from "@/lib/store/features/data-visualization/dataVisualizationSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const DataVisualization = () => {
  const currentDataVisualization = useAppSelector(
    selectCurrentDataVisualization
  );

  if (currentDataVisualization === "bar-chart") {
    return <Bar3DChart />;
  } else if (currentDataVisualization === "scatter-chart") {
    return <Scatter3DChart />;
  } else if (currentDataVisualization === "stacked-bar") {
    return <StackedBar3DChart />;
  } else if (currentDataVisualization === "flight-globe") {
    return <FlightGlobe />;
  } else {
    return <h1>No 3D Visualization is Selected</h1>;
  }
};

export default DataVisualization;

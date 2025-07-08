import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import * as echarts from "echarts";
import "echarts-gl"; // Import for 3D visualization
import { Button } from "../ui/button"; // Ensure paths are correct
import CustomTable from "../ui/custom-table";

const StackedBar3DChart = () => {
  const [data, setData] = useState([]); // Chart data
  const [stack, setStack] = useState([]); // Stack of additional data
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://fastly.jsdelivr.net/npm/simplex-noise@2.4.0/simplex-noise.js";
      script.async = true;
      script.onload = () => {
        if (typeof SimplexNoise === "undefined") {
          console.error("SimplexNoise is not loaded.");
          return;
        }

        // Generate initial data and stack
        const initialData = generateData(5); // Start with 5 records (half the original)
        const initialStack = generateData(40); // Separate stack with 40 additional records
        setData(initialData);
        setStack(initialStack);

        // Initialize chart
        const chartDom = document.getElementById("stacked-bar3d-chart");
        const myChart = echarts.init(chartDom);
        setChartInstance(myChart);

        updateChart(myChart, initialData);
      };
      script.onerror = () =>
        console.error("Failed to load the SimplexNoise script.");
      document.body.appendChild(script);
    }
  }, []);

  const generateData = (count) => {
    const generatedData = [];
    const noise = new SimplexNoise(Math.random);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < 10; j++) {
        const value = noise.noise2D(i / 5, j / 5);
        generatedData.push([i, j, value * 2 + 4]); // Scale noise value
      }
    }
    return generatedData;
  };

  const updateChart = (chart, updatedData) => {
    if (!chart) return;

    const series = [];
    for (let i = 0; i < 10; i++) {
      series.push({
        type: "bar3D",
        data: updatedData,
        stack: "stack",
        shading: "lambert",
        emphasis: {
          label: {
            show: false,
          },
        },
      });
    }

    const chartOption = {
      tooltip: {
        trigger: "item", // Trigger tooltip on item hover
        show: true,
        backgroundColor: "transparent",
        borderColor: "transparent", 
        appendToBody: true,
        formatter: function (params) {
          const [x, y, value] = params.value;
          return `
          <div class="card-gradient text-primary-foreground p-3 rounded-lg shadow-lg">
              <p class="text-sm font-semibold">X: <span class="font-normal">${x}</span></p>
              <p class="text-sm font-semibold">Y: <span class="font-normal">${y}</span></p>
              <p class="text-sm font-semibold">Value: <span class="font-normal">${value.toFixed(2)}</span></p>
          </div>`;
        },
      },
      xAxis3D: { type: "value" },
      yAxis3D: { type: "value" },
      zAxis3D: { type: "value" },
      grid3D: {
        viewControl: { autoRotate: false },
        light: {
          main: { shadow: true, quality: "ultra", intensity: 1.5 },
        },
      },
      series: series,
    };

    chart.setOption(chartOption);
  };

  const handleAddRecords = () => {
    if (stack.length >= 5) {
      const recordsToAdd = stack.slice(0, 5); // Take the top 5 records
      const remainingStack = stack.slice(5);
      setStack(remainingStack); // Remove the top 5 records from the stack
      setData((prevData) => {
        const updatedData = [...prevData, ...recordsToAdd];
        updateChart(chartInstance, updatedData);
        return updatedData;
      });
    } else {
      alert("Not enough records in the stack to add!");
    }
  };

  const handleRemoveRecords = () => {
    if (data.length > 5) {
      const remainingData = data.slice(0, -5); // Remove the last 5 records
      const recordsToStack = data.slice(-5);
      setData(remainingData);
      setStack((prevStack) => {
        const updatedStack = [...recordsToStack, ...prevStack];
        updateChart(chartInstance, remainingData);
        return updatedStack;
      });
    } else {
      alert("Not enough records in the data to remove!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gradient-2">
        3D Stacked Bar Chart
      </h1>
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <Button onClick={handleAddRecords} className="px-4 py-2">
          Add 5 Records
        </Button>
        <Button
          variant="destructive"
          onClick={handleRemoveRecords}
          className="px-4 py-2"
        >
          Remove 5 Records
        </Button>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5">
        <div
          id="stacked-bar3d-chart"
          style={{ height: "60vh", width: "100%" }}
        />
        <div
          className="overflow-scroll"
          style={{
            height: "70vh",
            overflowY: "auto", 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            marginBottom:'10px',
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <CustomTable data={data} />
        </div>
      </div>
    </div>
  );
};

// Prevent server-side rendering for this component
export default dynamic(() => Promise.resolve(StackedBar3DChart), {
  ssr: false,
});

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl"; // Import 3D support for ECharts
import { Button } from "../ui/button"; // Ensure paths are correct
import Spinner from "../ui/spinner";
import CustomTable from "../ui/custom-table";

const initialData = [
  { Income: 45000, "Life Expectancy": 78.5, Population: 150000000, Country: "USA", Year: "2020" },
  { Income: 12000, "Life Expectancy": 70.1, Population: 1300000000, Country: "India", Year: "2020" },
  { Income: 32000, "Life Expectancy": 75.0, Population: 50000000, Country: "Canada", Year: "2020" },
  { Income: 40000, "Life Expectancy": 72.4, Population: 1400000000, Country: "China", Year: "2020" },
  { Income: 18000, "Life Expectancy": 68.9, Population: 210000000, Country: "Brazil", Year: "2020" },
];

const initialStack = [
  { Income: 55000, "Life Expectancy": 80.2, Population: 180000000, Country: "Australia", Year: "2020" },
  { Income: 14000, "Life Expectancy": 69.5, Population: 1400000000, Country: "Pakistan", Year: "2020" },
  { Income: 36000, "Life Expectancy": 77.3, Population: 60000000, Country: "Germany", Year: "2020" },
  { Income: 45000, "Life Expectancy": 73.8, Population: 900000000, Country: "Nigeria", Year: "2020" },
  { Income: 22000, "Life Expectancy": 66.7, Population: 280000000, Country: "Indonesia", Year: "2020" },
];
const Scatter3DChart = () => {
  const [data, setData] = useState([]);
  const [stack, setStack] = useState([]);
  const [option, setOption] = useState(null);


  useEffect(() => {
    setData(initialData);
    setStack(initialStack);
  }, []);

  useEffect(() => {
    // Update chart options when data changes
    const symbolSize = 8;
    const chartOption = {
      grid3D: {
        viewControl: {
          projection: "orthographic",
        },
      },
      xAxis3D: {
        type: "category",
        name: "Country",
      },
      yAxis3D: {
        type: "value",
        name: "Life Expectancy",
      },
      zAxis3D: {
        type: "value",
        name: "Income",
      },
      dataset: {
        dimensions: [
          "Income",
          "Life Expectancy",
          "Population",
          "Country",
          { name: "Year", type: "ordinal" },
        ],
        source: data,
      },
      series: [
        {
          type: "scatter3D",
          symbolSize: symbolSize,
          encode: {
            x: "Country",
            y: "Life Expectancy",
            z: "Income",
            tooltip: [0, 1, 2, 3, 4],
          },
        },
      ],
      tooltip: {
        show: true,
        backgroundColor: "transparent",
        borderColor: "transparent", 
        shadowColor: "rgba(0, 0, 0, 0)",
        shadowBlur: 0,
        border:'none',
        appendToBody: true,
        formatter: (params) => {
          if (!params.data) return '';
          return `
              <div class="bg-gray-900 text-primary-foreground card-gradient p-3 rounded-lg shadow-lg">
                  <p class="text-sm font-semibold">Country: <span class="font-normal">${params.data.Country}</span></p>
                  <p class="text-sm font-semibold">Income: <span class="font-normal">${params.data.Income}</span></p>
                  <p class="text-sm font-semibold">Life Expectancy: <span class="font-normal">${params.data["Life Expectancy"]}</span></p>
                  <p class="text-sm font-semibold">Population: <span class="font-normal">${params.data.Population}</span></p>
                  <p class="text-sm font-semibold">Year: <span class="font-normal">${params.data.Year}</span></p>
              </div>`;
      },
      },
    };

    setOption(chartOption);
  }, [data]);

  const handleAddRecord = () => {
    if (stack.length > 0) {
      const [topElement, ...remainingStack] = stack;
      setStack(remainingStack); // Remove the top element from the stack
      setData((prevData) => [...prevData, topElement]); // Add it to the data
    } else {
      alert("No more records in the stack to add!");
    }
  };

  const handleDeleteRecord = () => {
    if (data.length > 1) {
      const dataCopy = [...data];
      const removedElement = dataCopy.pop(); // Remove the last element from the data
      setData(dataCopy);
      setStack((prevStack) => [removedElement, ...prevStack]); // Push it back to the stack
    } else {
      alert("No more records in the data to delete!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gradient-2">
        3D Scatter Chart
      </h1>
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <Button onClick={handleAddRecord} className="px-4 py-2">
          Add Record
        </Button>
        <Button variant="destructive" onClick={handleDeleteRecord} className="px-4 py-2">
          Delete
        </Button>
      </div>
      {option ? (
        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5">
          <ReactECharts
            option={option}
            style={{ height: "60vh", width: "100%" }}
            echarts={echarts}
          />
          <CustomTable data={data} />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Scatter3DChart;

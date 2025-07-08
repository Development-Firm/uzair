import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl"; // Import for 3D visualization
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import CustomTable from "../ui/custom-table";

const Bar3DChart = () => {
  const initialData = [
    { Income: 45000, "Life Expectancy": 78.5, Population: 150000000, Country: "USA", Year: "2021" },
    { Income: 12000, "Life Expectancy": 70.1, Population: 1300000000, Country: "India", Year: "2022" },
    { Income: 32000, "Life Expectancy": 75.0, Population: 50000000, Country: "Canada", Year: "2020" },
    { Income: 40000, "Life Expectancy": 72.4, Population: 1400000000, Country: "China", Year: "2020" },
    { Income: 18000, "Life Expectancy": 68.9, Population: 210000000, Country: "Brazil", Year: "2020" },
  ];

  const initialStack = [
    { Income: 55000, "Life Expectancy": 80.2, Population: 180000000, Country: "Australia", Year: "2020" },
    { Income: 14000, "Life Expectancy": 69.5, Population: 1400000000, Country: "Pakistan", Year: "2020" },
    { Income: 36000, "Life Expectancy": 77.3, Population: 60000000, Country: "Germany", Year: "2019" },
    { Income: 45000, "Life Expectancy": 73.8, Population: 900000000, Country: "Nigeria", Year: "2020" },
    { Income: 22000, "Life Expectancy": 66.7, Population: 280000000, Country: "Indonesia", Year: "2023" },
  ];

  const [data, setData] = useState([]);
  const [stack, setStack] = useState([]);
  const [option, setOption] = useState(null);

  useEffect(() => {
    // Initialize data and stack
    setData(initialData);
    setStack(initialStack);
  }, []);

  useEffect(() => {
    // Update chart options whenever data changes
    const chartOption = {
      grid3D: {
        viewControl: {
          projection: "orthographic",
        },
      },
      tooltip: {
        show: true,
        backgroundColor: "transparent",
        borderColor: "transparent", 
        shadowColor: "rgba(0, 0, 0, 0)",
        shadowBlur: 0,
        border:'none',
        appendToBody: true,
        formatter: (params) => {
          const { data } = params;
          return `
          <div class=" p-3 overflow-hidden shadow-lg rounded-lg card-gradient text-primary-foreground">
            <p class="font-semibold text-lg">${data.Country}</p>
            <p><span class="font-medium">Year:</span> ${data.Year}</p>
            <p><span class="font-medium">Income:</span> $${data.Income.toLocaleString()}</p>
            <p><span class="font-medium">Life Expectancy:</span> ${data["Life Expectancy"]} years</p>
            <p><span class="font-medium">Population:</span> ${data.Population.toLocaleString()}</p>
          </div>
        `;
        },
      },
      xAxis3D: {
        type: "category",
        name: "Year",
      },
      yAxis3D: {
        type: "category",
        name: "Country",
      },
      zAxis3D: {
        type: "value",
        name: "Life Expectancy",
      },
      visualMap: {
        max: 1.5e9,
        dimension: "Population",
        inRange: {
          color: ["#d94e5d", "#eac736", "#50a3ba"],
        },
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
          type: "bar3D",
          shading: "lambert",
          encode: {
            x: "Year",
            y: "Country",
            z: "Life Expectancy",
            tooltip: ["Income", "Life Expectancy", "Population", "Country", "Year"],
          },
        },
      ],
    };
    setOption(chartOption);
  }, [data]);

  const handleAddRecord = () => {
    if (stack.length > 0) {
      const [topElement, ...remainingStack] = stack;
      setStack(remainingStack); // Remove top element from stack
      setData((prevData) => [...prevData, topElement]); // Add it to data
    } else {
      alert("No more records in the stack to add!");
    }
  };

  const handleDeleteRecord = () => {
    if (data.length > 1) {
      const dataCopy = [...data];
      const removedElement = dataCopy.pop(); // Remove the last element from data
      setData(dataCopy);
      setStack((prevStack) => [removedElement, ...prevStack]); // Add it back to stack
    } else {
      alert("No more records in the data to delete!");
    }
  };


  return (
    <div className="w-full flex flex-col items-center px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gradient-2">3D Bar Chart</h1>
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

export default Bar3DChart;

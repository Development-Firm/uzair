import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import Spinner from "../ui/spinner";
import CustomTable from "../ui/custom-table";

const countries = {
  USA: {
    airports: [
      { name: "Los Angeles", coord: [-118.25, 34.05] },
      { name: "New York", coord: [-74.0, 40.7] },
      { name: "Chicago", coord: [-87.63, 41.88] },
      { name: "Houston", coord: [-95.37, 29.76] },
      { name: "San Francisco", coord: [-122.42, 37.77] },
      { name: "Denver", coord: [-104.99, 39.74] },
      { name: "Seattle", coord: [-122.33, 47.61] },
      { name: "Miami", coord: [-80.19, 25.76] },
      { name: "Las Vegas", coord: [-115.14, 36.17] },
      { name: "Atlanta", coord: [-84.39, 33.75] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  France: {
    airports: [
      { name: "Paris", coord: [2.35, 48.86] },
      { name: "Nice", coord: [7.26, 43.7] },
      { name: "Lyon", coord: [4.83, 45.75] },
      { name: "Marseille", coord: [5.38, 43.3] },
      { name: "Toulouse", coord: [1.44, 43.6] },
      { name: "Bordeaux", coord: [-0.58, 44.84] },
      { name: "Lille", coord: [3.06, 50.63] },
      { name: "Nantes", coord: [-1.55, 47.22] },
      { name: "Strasbourg", coord: [7.75, 48.58] },
      { name: "Montpellier", coord: [3.88, 43.61] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  China: {
    airports: [
      { name: "Beijing", coord: [116.3, 39.9] },
      { name: "Shanghai", coord: [121.47, 31.23] },
      { name: "Guangzhou", coord: [113.26, 23.13] },
      { name: "Shenzhen", coord: [114.06, 22.54] },
      { name: "Chengdu", coord: [104.07, 30.67] },
      { name: "Wuhan", coord: [114.31, 30.52] },
      { name: "Xi’an", coord: [108.93, 34.27] },
      { name: "Hangzhou", coord: [120.15, 30.28] },
      { name: "Chongqing", coord: [106.55, 29.57] },
      { name: "Nanjing", coord: [118.8, 32.06] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  India: {
    airports: [
      { name: "Delhi", coord: [77.1, 28.7] },
      { name: "Mumbai", coord: [72.87, 19.07] },
      { name: "Bangalore", coord: [77.59, 12.97] },
      { name: "Chennai", coord: [80.27, 13.08] },
      { name: "Kolkata", coord: [88.36, 22.57] },
      { name: "Hyderabad", coord: [78.47, 17.38] },
      { name: "Pune", coord: [73.85, 18.52] },
      { name: "Ahmedabad", coord: [72.58, 23.03] },
      { name: "Jaipur", coord: [75.79, 26.91] },
      { name: "Lucknow", coord: [80.95, 26.85] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  Brazil: {
    airports: [
      { name: "São Paulo", coord: [-46.63, -23.55] },
      { name: "Rio de Janeiro", coord: [-43.2, -22.91] },
      { name: "Brasilia", coord: [-47.93, -15.78] },
      { name: "Salvador", coord: [-38.51, -12.97] },
      { name: "Fortaleza", coord: [-38.54, -3.72] },
      { name: "Belo Horizonte", coord: [-43.94, -19.92] },
      { name: "Curitiba", coord: [-49.27, -25.43] },
      { name: "Manaus", coord: [-60.02, -3.1] },
      { name: "Recife", coord: [-34.88, -8.05] },
      { name: "Porto Alegre", coord: [-51.22, -30.03] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  Germany: {
    airports: [
      { name: "Berlin", coord: [13.4, 52.52] },
      { name: "Frankfurt", coord: [8.68, 50.11] },
      { name: "Munich", coord: [11.57, 48.13] },
      { name: "Hamburg", coord: [9.99, 53.55] },
      { name: "Cologne", coord: [6.96, 50.94] },
      { name: "Stuttgart", coord: [9.18, 48.78] },
      { name: "Düsseldorf", coord: [6.77, 51.23] },
      { name: "Dortmund", coord: [7.46, 51.51] },
      { name: "Leipzig", coord: [12.37, 51.34] },
      { name: "Nuremberg", coord: [11.08, 49.45] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  Japan: {
    airports: [
      { name: "Tokyo", coord: [139.69, 35.69] },
      { name: "Osaka", coord: [135.5, 34.69] },
      { name: "Nagoya", coord: [136.91, 35.18] },
      { name: "Sapporo", coord: [141.35, 43.06] },
      { name: "Fukuoka", coord: [130.4, 33.59] },
      { name: "Hiroshima", coord: [132.46, 34.4] },
      { name: "Sendai", coord: [140.87, 38.27] },
      { name: "Naha", coord: [127.68, 26.21] },
      { name: "Kobe", coord: [135.17, 34.69] },
      { name: "Yokohama", coord: [139.64, 35.44] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
  Australia: {
    airports: [
      { name: "Sydney", coord: [151.21, -33.87] },
      { name: "Melbourne", coord: [144.96, -37.81] },
      { name: "Brisbane", coord: [153.03, -27.47] },
      { name: "Perth", coord: [115.86, -31.95] },
      { name: "Adelaide", coord: [138.6, -34.93] },
      { name: "Gold Coast", coord: [153.42, -28.0] },
      { name: "Canberra", coord: [149.13, -35.28] },
      { name: "Hobart", coord: [147.32, -42.88] },
      { name: "Darwin", coord: [130.84, -12.46] },
      { name: "Cairns", coord: [145.77, -16.92] },
    ],
    routes: [
      { source: 0, destination: 1 },
      { source: 1, destination: 2 },
      { source: 2, destination: 3 },
      { source: 3, destination: 4 },
      { source: 4, destination: 5 },
      { source: 5, destination: 6 },
      { source: 6, destination: 7 },
      { source: 7, destination: 8 },
      { source: 8, destination: 9 },
      { source: 9, destination: 0 },
    ],
  },
};

const FlightGlobe = () => {
  const [selectedCountries, setSelectedCountries] = useState(["USA", "Brazil"]); // Default selected countries
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null); // Store the ECharts instance

  useEffect(() => {
    if (!chartRef.current) {
      const chartDom = document.getElementById("chart");
      chartRef.current = echarts.init(chartDom);

      // Detect screen size for responsive zoom
      const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 768;

      // Set the static globe configuration
      chartRef.current.setOption({
        tooltip: {
          trigger: "item",
          show: true,
          backgroundColor: "transparent",
          borderColor: "transparent", 
          shadowColor: "rgba(0, 0, 0, 0)",
          shadowBlur: 0,
          border:'none',
          appendToBody: true,
          formatter: (params) => {
            if (params.seriesType === "scatter3D") {
              return `<div class="card-gradient text-primary-foreground" style="padding: 8px; border-radius: 8px;">
                        <strong>Airport:</strong> ${params.name}<br>
                        <strong>Coordinates:</strong> ${params.value.join(", ")}
                      </div>`;
            } else if (params.seriesType === "lines3D") {
              const from = dummyAirports[params.dataIndex % dummyAirports.length];
              const to = dummyAirports[(params.dataIndex + 1) % dummyAirports.length];
              return `<div class="card-gradient text-primary-foreground" style="padding: 8px; border-radius: 8px;">
                        <strong>Route:</strong><br>
                        <strong>From:</strong> ${from.name}<br>
                        <strong>To:</strong> ${to.name}
                      </div>`;
            }
            return "";
          }
        },
        globe: {
          baseTexture: "/assets/textures/earth_nightmap.jpg",
          environment: "/assets/textures/milky_way.jpg",
          shading: "realistic",
          realisticMaterial: {
            roughness: 0.6,
            metalness: 0.4,
          },
          light: {
            // main: {
            //   intensity: 5,
            //   shadow: true,
            // },
            ambient: {
              intensity: 1.5,
            },
          },
          viewControl: {
            autoRotate: true,
            autoRotateSpeed: 5,
            distance: isMobile ? 410 : 150, // Adjust distance based on screen size
            minDistance: 150, // Minimum zoom level
            maxDistance: 500, // Maximum zoom level
          },
        },
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const scatterData = [];
    const routesData = [];

    selectedCountries.forEach((country) => {
      const countryData = countries[country];
      countryData.airports.forEach((airport) =>
        scatterData.push({
          name: airport.name,
          value: airport.coord,
        })
      );
      countryData.routes.forEach((route) =>
        routesData.push([
          countryData.airports[route.source].coord,
          countryData.airports[route.destination].coord,
        ])
      );
    });

    // Update the series without reloading the globe texture
    chartRef.current.setOption({
      series: [
        {
          type: "lines3D",
          name: "Flight Routes",
          effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.2,
            trailOpacity: 0.6,
            trailColor: "rgb(30, 30, 60)",
          },
          lineStyle: {
            color: "rgb(50, 50, 150)",
            width: 1,
            opacity: 0.8,
          },
          blendMode: "lighter",
          data: routesData,
        },
        {
          type: "scatter3D",
          coordinateSystem: "globe",
          symbolSize: 8,
          itemStyle: {
            color: "rgb(50, 150, 255)",
          },
          label: {
            show: true,
            formatter: (params) => params.name,
            position: "right",
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
          data: scatterData,
        },
      ],
    });
  }, [selectedCountries]);

  const handleCountryChange = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const transformData = (countries) => {
    let transformedData = [];

    Object.keys(countries).forEach((countryName) => {
      if (selectedCountries.includes(countryName)) {
        const country = countries[countryName];
        const airports = country.airports;
        const routes = country.routes;

        routes.forEach((route) => {
          const sourceAirport = airports[route.source];
          const destinationAirport = airports[route.destination];
          transformedData.push({
            country: countryName,
            sourceAirport: sourceAirport.name,
            sourceCoord: sourceAirport.coord.join(", "), // Format coords as string
            destinationAirport: destinationAirport.name,
            destinationCoord: destinationAirport.coord.join(", "),
          });
        });
      }
    });

    return transformedData;
  };

  // Example usage
  const transformedCountriesData = transformData(countries);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
      className=""
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gradient-2">
        3D Globe Visualization
      </h1>
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "10px",
          zIndex: 1000,
          color: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
        className="card-gradient"
      >
        <p>Select Countries:</p>
        {Object.keys(countries).map((country) => (
          <div key={country}>
            <input
              type="checkbox"
              id={country}
              checked={selectedCountries.includes(country)}
              onChange={() => handleCountryChange(country)}
            />
            <label htmlFor={country} className="pl-3">
              {country}
            </label>
          </div>
        ))}
      </div>
      <div id="chart" style={{ width: "100%", height: "100%" }}/>
      <div className="px-10 ">
        <CustomTable data={transformedCountriesData} />
      </div>
      {isLoading && <Spinner />}
    </div>
  );
};

export default FlightGlobe;

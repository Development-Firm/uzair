import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomTable = ({ data = [] }) => {
  // Extract the headers from the keys of the first object in the data array
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Table className="table-auto w-full rounded-lg overflow-hidden card-gradient backdrop-blur-10">
      <TableHeader>
        <TableRow className="bg-black card-gradient hover:bg-gray-700">
          {/* Dynamically generate table headers */}
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className="text-gradient px-4 py-2 text-left font-semibold text-sm uppercase tracking-wide text-primary-foreground"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Dynamically generate table rows */}
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={`hover:bg-gray-700 transition-all duration-200 text-primary-foreground cursor-pointer`} // Hover effect and semi-transparent background
          >
            {headers.map((header, index) => (
              <TableCell
                key={index}
                className={`px-4 py-2 ${index === headers.length - 1 ? "text-right" : ""}`}
              >
                {row[header]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;

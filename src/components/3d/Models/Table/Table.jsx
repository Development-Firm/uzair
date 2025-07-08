import React from "react";
import { TableMd } from "./Table-md";
import { useAppSelector } from "@/lib/store/hooks";
import { selectTableSize } from "@/lib/store/features/table/tableSlice";
import { TableLg } from "./Table-lg";

const Table = () => {
  const tableSize = useAppSelector(selectTableSize)
  if(tableSize === 'medium'){
    return <TableMd position={[0,-2.3,0]} />;
  }else{
    return <TableLg position={[0,-2.3,0]}  />;
  }
};

export default Table;

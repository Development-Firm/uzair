import {
  selectTableDesignMap,
  selectTableSize,
} from "@/lib/store/features/table/tableSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const TableInfo = () => {
  const tableSize = useAppSelector(selectTableSize);
  const tableDesignMap = useAppSelector(selectTableDesignMap);



  return (
    <div className="grid grid-cols-2 gap-4">
      <div>Size: {tableSize}</div>
      <div>
        Base Color:{" "}
        <span style={{ backgroundColor: tableDesignMap?.base?.color }}>
          {tableDesignMap?.base?.color}
        </span>
      </div>
      <div>
        Legs Color:{" "}
        <span style={{ backgroundColor: tableDesignMap?.legs?.color }}>
          {tableDesignMap?.legs?.color}
        </span>
      </div>
      <div>
        Shield Color:{" "}
        <span style={{ backgroundColor: tableDesignMap?.shield?.color }}>
          {tableDesignMap?.shield?.color}
        </span>
      </div>
      <div>
        Shield Support:{" "}
        <span style={{ backgroundColor: tableDesignMap?.shieldSupport?.color }}>
          {tableDesignMap?.shieldSupport?.color}
        </span>
      </div>
      <div>
        Central Support:
        <span style={{ backgroundColor: tableDesignMap?.centralSupport?.color }}>
          {tableDesignMap?.centralSupport?.color}
        </span>
      </div>
    </div>
  );
};

export default TableInfo;

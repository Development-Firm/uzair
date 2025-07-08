import * as React from "react";
import { cn } from "@/lib/utils";

const ItemList = ({ items, onChange }) => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleItemClick = (value) => {
    setSelectedItem(value);
    onChange(value);
  };

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.value}
          className={cn(
            "flex gap-2 items-center p-2 px-4 rounded-full cursor-pointer transition-colors text-primary-foreground",
            item.value === selectedItem ? "bg-primary text-white" : "hover:bg-secondary"
          )}
          onClick={() => handleItemClick(item.value)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;

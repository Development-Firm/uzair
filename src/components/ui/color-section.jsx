import React, { useState } from "react";
import { Button } from "./button";
import { colors } from "@/lib/data";
import ColorPicker from "react-best-gradient-color-picker";
import { ScrollArea } from "./scroll-area";

const ColorSection = ({ value, onChange, resetHandler }) => {
  const [isCustomColor, setIsCustomColor] = useState(false);

  return (
    <div className="relative w-full">
      {!isCustomColor ? (
        <span
          className="text-bold absolute right-1 -translate-y-4 text-primary-foreground hover:underline cursor-pointer"
          onClick={() => setIsCustomColor(true)}
        >
          Use Custom Color
        </span>
      ) : (
        <span
          className="text-bold absolute right-1 -translate-y-4 z-10 text-primary-foreground hover:underline cursor-pointer"
          onClick={() => setIsCustomColor(false)}
        >
          Cancel
        </span>
      )}

      {isCustomColor ? (
        <div className="relative w-full h-full">
          <div className="h-[2rem]"></div>
          <span
            className="text-bold absolute z-10 top-48 text-primary-foreground hover:underline cursor-pointer"
            onClick={resetHandler}
          >
            Reset
          </span>
          <ColorPicker
            hideGradientControls
            hideColorTypeBtns
            hideInputType
            hideAdvancedSliders
            hideColorGuide
            value={value}
            onChange={(value) => onChange(value)}
            width={300}
            height={150}
            className="rounded-xl"
          />
        </div>
      ) : (
        <div className="space-y-1 w-full h-full">
          <div className="h-[1rem]"></div>
          <ScrollArea className="h-96">
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => onChange(color?.color)}
                className={`w-full flex justify-between items-center rounded-full cursor-pointer border border-transparent
                  hover:border hover:border-secondary-foreground transition-shadow duration-300 px-4 py-2 
                  ${color.color === value ? "bg-opacity-25" : ""}`}
                style={{
                  backgroundColor:
                    color.color === value ? `${color.color}40` : "transparent",
                }}
              >
                <div className="text-primary-foreground">{color?.name}</div>
                <div
                  className="w-10 h-10 rounded-full inline-block"
                  style={{ backgroundColor: color.color }}
                ></div>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default ColorSection;

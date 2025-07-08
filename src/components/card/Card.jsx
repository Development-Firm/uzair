import Image from "next/image";
import React from "react";

const Card = ({ item, handleClick }) => {
  return (
    <div
      key={item?.modelKey}
      className="overflow-hidden relative group cursor-pointer w-full inline-block bg-transparent backdrop-blur-lg rounded-lg shadow-md transition-all duration-500 ease-in-out hover:shadow-xl"
      onClick={() => handleClick(item)}
      style={{
        background: `
          linear-gradient(195.05deg, rgba(43, 232, 214, 0.15) 0%, rgba(43, 232, 214, 0.02) 50%, rgba(26, 201, 246, 0.06) 100%),
          linear-gradient(180deg, rgba(43, 255, 255, 0.12) 0%, rgba(43, 255, 255, 0.04) 50%, rgba(26, 201, 246, 0.07) 100%)`,

      }}
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-lg overflow-visible m-3">
        <Image
          src={item.imageUrl}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-lg"
        />
        {/* Title Overlay - Prevent scaling */}
        <div className="absolute bottom-0 left-0 right-0 text-primary-foreground text-center py-2 text-lg font-semibold ">
          {item.title}
        </div>
      </div>
    </div>
  );
};

export default Card;

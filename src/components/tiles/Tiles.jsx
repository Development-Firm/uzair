import { productsData } from "@/lib/data";
import Image from "next/image";
import React from "react";
import Card from "../card";

const Tiles = ({data=[], handleClick, title}) => {
  return (
    <section id="about" className="z-30 relative">
      <h1 className="text-3xl font-bold my-4 text-gradient-2 text-center">
       {title} 
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[3rem]">
        {(data || []).map((item, index) => (
          <Card key={index} item={item} handleClick={handleClick} />
        ))}
      </div>
    </section>
  );
};

export default Tiles;

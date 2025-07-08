import Image from 'next/image';

const CircleGrid = ({ data, onClick, selectedItemValue }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-y-6">
      {data.map((item, index) => {
        const borderValue = selectedItemValue?.url === item?.url ? "border-2 border-white" : "";

        return (
          <div
            key={index}
            onClick={() => onClick(item)}
            className={`${borderValue} relative w-20 h-20 rounded-full overflow-hidden cursor-pointer transition-transform transform hover:scale-105 shadow-lg`}
          >
            <Image
              src={item.src || item.url}
              alt={item.label}
              fill
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CircleGrid;

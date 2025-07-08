import Image from 'next/image';

const Grid = ({ items, onClick }) => {
  return (
    <div className="mx-auto">
      <div className="container mx-auto flex flex-wrap gap-10 justify-center">
        {items.map((item) => (
          <div
            key={item?.modelKey}
            className="relative group cursor-pointer h-96 w-96  inline-block"
            onClick={() => onClick(item)}
          >
            {/* Image Container */}
            <div className="relative aspect-square border border-border bg-muted rounded-lg overflow-hidden shadow-md transition-all duration-500 ease-in-out group-hover:shadow-lg group-hover:scale-102">
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 text-primary text-center py-2 text-lg font-semibold">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;

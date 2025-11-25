import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  // const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      <div className="w-full bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden mb-4">
        <div
          className="flex justify-between items-center p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
          onClick={handleClick}
        >
          <span className="font-bold text-xl text-gray-800">
            {data.title} ({data.itemCards.length})
          </span>
          <span className={`transform transition-transform duration-300 ${showItems ? 'rotate-180' : ''}`}>
            🔽
          </span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;

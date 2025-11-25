import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../ReduxStore/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  // console.log(items);
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex justify-between items-start p-6 border-b border-gray-100 last:border-b-0"
        >
          <div className="w-9/12 pr-4">
            <div className="py-2">
              <p className="text-lg font-bold text-gray-800 mb-1">{item.card.info.name}</p>
              <p className="font-medium text-gray-700 mb-2">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100 ||
                    Math.floor(Math.random() * 999) + 100}
              </p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {item.card.info.description}
            </p>
          </div>
          <div className="relative w-3/12">
            {item.card.info.imageId ? (
              <img
                src={CDN_URL + item.card.info.imageId}
                className="w-full h-32 object-cover rounded-xl shadow-sm"
                alt={item.card.info.name}
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs">
                NO IMAGE
              </div>
            )}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                className="bg-white text-green-600 font-bold px-8 py-2 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow uppercase text-sm whitespace-nowrap"
                onClick={() => handleAddItem(item)}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

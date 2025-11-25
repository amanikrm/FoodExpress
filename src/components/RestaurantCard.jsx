import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating, sla } =
    resData?.info;
  const deliveryTime = sla?.deliveryTime;

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          alt="res.logo"
          src={CDN_URL + cloudinaryImageId}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
           {/* Gradient overlay for better text visibility if needed */}
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-1 flex-grow">
        <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>
        <h4 className="text-sm text-gray-500 truncate font-medium">{cuisines.join(", ")}</h4>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-white text-xs font-bold ${avgRating >= 4 ? 'bg-green-500' : 'bg-orange-500'}`}>
            <span>★</span>
            <span>{avgRating}</span>
          </div>
          <h4 className="text-xs font-semibold text-gray-600">•</h4>
          <h4 className="text-xs font-semibold text-gray-600">{deliveryTime} mins</h4>
          <h4 className="text-xs font-semibold text-gray-600">•</h4>
          <h4 className="text-xs font-semibold text-gray-600">{costForTwo}</h4>
        </div>
      </div>
    </div>
  );
};

// high order component is a function that takes a component as an argument and returns a new component
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative h-full">
        <label className="absolute top-4 left-0 bg-black text-white px-3 py-1 rounded-r-lg z-10 text-xs font-bold shadow-md">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;

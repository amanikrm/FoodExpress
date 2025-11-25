import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import { MOCK_MENU_DATA } from "../utils/mockMenuData";

const RestaurantMenu = () => {
  const { resId } = useParams();
  console.log("resId", resId);

  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resId) {
      fetchData();
    }
  }, [resId]);

  const fetchData = async () => {
    const apis = [
      MENU_API + resId, // Direct (works with extension)
      "https://corsproxy.io/?" + MENU_API + resId, // Proxy 1
      "https://thingproxy.freeboard.io/fetch/" + MENU_API + resId, // Proxy 2
      "https://api.allorigins.win/raw?url=" + encodeURIComponent(MENU_API + resId) // Proxy 3
    ];

    for (const url of apis) {
      try {
        console.log("Trying to fetch from:", url);
        const data = await fetch(url);
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }
        const json = await data.json();
        console.log("Data fetched successfully from:", url);
        setResInfo(json);
        setError(null); // Clear any previous errors
        return; // Exit function on success
      } catch (err) {
        console.error("Fetch failed for:", url, err);
        // Continue to next URL
      }
    }

    // If all fail
    console.warn("All API calls failed. Using Mock Data as fallback.");
    setResInfo(MOCK_MENU_DATA);
    setError(null); // Clear error since we are showing mock data
    // setError("Failed to fetch menu data from all sources. Please check your connection or try again later.");
  };

  const [showIndex, setShowIndex] = useState(null);

  if (error) return <div className="text-center text-red-500 font-bold p-10">Error: {error}. Please try again later.</div>;
  if (resInfo === null) return <Shimmer />;

  // --- ROBUST DATA EXTRACTION LOGIC ---

  // 1. Function to find Restaurant Info (recursively)
  const findRestaurantInfo = (obj) => {
    if (!obj) return null;
    
    // Check if this object looks like the restaurant info object
    if (obj.name && obj.cuisines && obj.costForTwo && obj.avgRating) {
      return obj;
    }

    if (Array.isArray(obj)) {
      for (let item of obj) {
        const result = findRestaurantInfo(item);
        if (result) return result;
      }
    } else if (typeof obj === 'object') {
      for (let key in obj) {
        const result = findRestaurantInfo(obj[key]);
        if (result) return result;
      }
    }
    return null;
  };

  // 2. Function to find the Menu Categories (recursively find 'groupedCard')
  const findMenuCategories = (obj) => {
    if (!obj) return [];

    // If we find 'groupedCard', we know where the menu is
    if (obj.groupedCard?.cardGroupMap?.REGULAR?.cards) {
      const cards = obj.groupedCard.cardGroupMap.REGULAR.cards;
      // Filter for ItemCategory
      const categories = cards.filter(
        (c) =>
          c.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
      return categories;
    }

    if (Array.isArray(obj)) {
      for (let item of obj) {
        const result = findMenuCategories(item);
        if (result && result.length > 0) return result;
      }
    } else if (typeof obj === 'object') {
      for (let key in obj) {
        const result = findMenuCategories(obj[key]);
        if (result && result.length > 0) return result;
      }
    }
    return [];
  };

  // Use the functions to get data
  const restaurantInfo = findRestaurantInfo(resInfo?.cards);
  const categories = findMenuCategories(resInfo?.cards);

  console.log("--- DEBUG LOGS ---");
  console.log("Full JSON:", resInfo);
  console.log("Found Restaurant Info:", restaurantInfo);
  console.log("Found Categories:", categories);

  // Fallback if data is not found (prevent crash)
  if (!restaurantInfo) {
    return <div className="text-center p-10">Data not found</div>;
  }

  const { name, cuisines, costForTwo } = restaurantInfo;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center">
      <h2 className="font-bold text-3xl md:text-5xl text-gray-800 mb-4">{name}</h2>
      <p className="font-semibold text-lg text-gray-600 mb-8 bg-gray-100 inline-block px-6 py-2 rounded-full">
        {cuisines.join(", ")} • ₹{costForTwo / 100} for two
      </p>

      {/* categories-accordian */}
      <div className="flex flex-col gap-4">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card?.title}
              data={category?.card?.card}
              showItems={index === showIndex}
              setShowIndex={() =>
                setShowIndex((prevIndex) => (prevIndex === index ? null : index))
              }
            />
          ))
        ) : (
          <p className="text-gray-500">No menu categories found.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;

import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { resList } from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState(null);
  const [filteredRestaurant, setfilteredRestaurant] = useState(null);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("Body prints", listOfRestaurants);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.1766701&lng=78.00807449999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await data.json();

      // Recursive function to find the 'restaurants' array in the JSON structure
      const findRestaurants = (obj) => {
        if (!obj) return null;
        
        // Check if the current object has the 'restaurants' key which is an array
        if (obj.hasOwnProperty('restaurants') && Array.isArray(obj.restaurants) && obj.restaurants.length > 0) {
          return obj.restaurants;
        }

        // If it's an array, iterate through its elements
        if (Array.isArray(obj)) {
          for (let item of obj) {
            const result = findRestaurants(item);
            if (result) return result;
          }
        } 
        // If it's an object, iterate through its keys
        else if (typeof obj === 'object') {
          for (let key in obj) {
            const result = findRestaurants(obj[key]);
            if (result) return result;
          }
        }

        return null;
      };

      const restaurants = findRestaurants(json?.data?.cards);

      if (restaurants) {
        setlistOfRestaurants(restaurants);
        setfilteredRestaurant(restaurants);
      } else {
        throw new Error("Restaurants not found in API response");
      }

    } catch (error) {
      console.warn("Failed to fetch live data, using mock data fallback.", error);
      setlistOfRestaurants(resList);
      setfilteredRestaurant(resList);
    }
  };

  if (!useOnlineStatus()) {
    return (
      <div>
        <h1>
          Looks Like You're Offline, Please Check your Internet Connection.
        </h1>
      </div>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);
  const [newUserName, setNewUserName] = useState("");

  // console.log(setUserName);
  
  // console.log("listOfRestaurants", listOfRestaurants);

  if (!listOfRestaurants) {
    return <Shimmer />;
  }

  return (
    <div className="body max-w-7xl mx-auto px-4 pb-12">
      <div className="filter flex flex-col md:flex-row justify-between items-center py-8 gap-4">
        <div className="search w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search for restaurants..."
            className="border border-gray-300 rounded-full px-6 py-2 w-full sm:w-80 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-6 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-sm w-full sm:w-auto"
            onClick={() => {
              console.log(searchText);
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setfilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <button
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto font-medium"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setfilteredRestaurant(filteredList);
            }}
          >
            Top Rated
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-40 focus:outline-none focus:border-orange-500 transition-all"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors border border-gray-200 w-full sm:w-auto font-medium"
              onClick={() => setUserName(newUserName)}
            >
              Set User
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="transform hover:scale-105 transition-transform duration-200"
          >
            {
              /* {Promote those restaurants which having the averageRating below 4.3 .} */
              /* {if the restaurant is promoted then add a promoted label to it.} */
              restaurant.info.avgRating < 4.3 ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )
            }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

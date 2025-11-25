import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import LOGO from '../assets/images/FoodExpress_Logo.png'

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const { onlineStatus, onlineText } = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  // Subscribing to our store using a Selector.
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <div className="flex flex-col md:flex-row justify-between bg-white shadow-md sticky top-0 z-50 px-4 md:px-8 py-2">
      <div className="logo-container flex justify-center md:justify-start items-center">
        <Link to="/">
          <img className="w-24 hover:scale-105 transition-transform duration-200" src={LOGO} alt="FoodExpress Logo" />
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-gray-700 font-medium">
          <li className="flex items-center gap-2">
            <span className={onlineStatus ? "text-green-500" : "text-red-500"}>●</span>
            {onlineStatus ? "Online" : "Offline"}
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200 font-bold flex items-center gap-1">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <button
              className="login-btn px-6 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={() => {
                loginBtn === "Login"
                  ? setLoginBtn("Logout")
                  : setLoginBtn("Login");
              }}
            >
              {loginBtn}
            </button>
          </li>
          <li className="font-bold text-orange-600">
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

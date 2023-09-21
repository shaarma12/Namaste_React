import { useState } from "react";
import Logoimg from "../../images/Logoimg.png";
import cart from "../../images/cart.png";
import { Link } from "react-router-dom";
import useStatus from "../utils/usestatus";

const Header = () => {
  const [title, setTitle] = useState("Login");

  // Custom Hook Creation that get the data regarding online status.
  const onlineStatus = useStatus();
  return (
    <>
      <div className="flex justify-between items-center shadow-lg sticky top-0 z-[99]">
        {/* Logo */}
        <div>
          <Link to="/">
            <img className="w-40" src={Logoimg} alt="Main Logo" />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="mr-14">
          <ul className="flex">
            <li className="px-10 text-3xl  font-serif hover:text-red-600 hover:border-">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="px-10 text-3xl font-serif  hover:text-red-600">
              <Link className="link" to="/about">
                About
              </Link>
            </li>
            <li className="px-10 text-3xl font-serif  hover:text-red-600">
              <Link className="link" to="/services">
                Services
              </Link>
            </li>
            <li className="px-10 text-3xl font-serif  hover:text-red-600">
              <Link className="link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="px-10 text-3xl font-serif  hover:text-red-600">
              <Link className="link" to="/grocery">
                Grocery
              </Link>
            </li>
            {/* <li className="px-10 text-3xl font-serif">
              {onlineStatus ? "🟢" : "🔴"}
            </li> */}
          </ul>
        </div>
        <div className="flex items-center">
          {/* cart */}

          <div id="cart">
            <a href="#" target="_blank">
              <img className="w-14 mx-4" src={cart} alt="Cart" />
            </a>
          </div>

          {/* user icon */}

          <div className="mr-5">
            <button
              onClick={() => {
                title === "Login" ? setTitle("Logout") : setTitle("Login");
              }}
              className="px-4 py-2 ml-5 rounded-lg bg-red-400 text-white hover:scale-y-110 transition-all ms-[0.3]"
            >
              {title}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

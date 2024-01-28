import React from "react";
import { Link } from "react-router-dom";

const Cartpopup = () => {
  return <div className="w-[30rem] p-10 h-64 bg-white drop-shadow-[5px_5px_10px_rgba(8,7,7,1)] rounded-lg fixed top-48">
    <p className="text-center font-bold text-3xl">Are you sure?</p>
    <p className="w-80 ml-14 text-gray-500">Are you sure you want to place the order. Once order is placed it cannot be cancel.</p>
    <div className="flex mt-8">
      <button className="py-4 px-16 bg-[#60B240] text-white mr-8 text-lg font-semibold hover:drop-shadow-lg">Cancel</button>
      <Link to="/order-confirmation">
      <button className="py-4 px-16 bg-[#60B240] text-white text-lg font-semibold hover:drop-shadow-lg">Confirm</button></Link>
    </div>
  </div>;
};

export default Cartpopup;

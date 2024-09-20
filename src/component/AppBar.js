import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AppBar = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const lang = sessionStorage.getItem("lang") || 'En';

  const menuClicked = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://ironwood-backend.vercel.app/element/header/${lang}`);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang]); // Re-fetch if language changes

  return (
    <nav className="w-full bg-slate-600">
      <div className="flex text-white justify-between items-center w-5/6 mx-auto h-24 px-4">
        {/* Brand Name */}
        <div className="font-semibold text-3xl">IRONWOOD</div>

        {/* Navigation Links (mobile view) */}
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute inset-x-0 top-24 bg-slate-600 border-t-4 rounded-b-3xl z-10 xl:hidden`}
        >
          <div className="flex flex-col items-center py-4 pb-28">
            <ul className="space-y-9 text-xl">
              {data ? (
                <>
                  <li>
                    <Link to="/" onClick={handleMenuItemClick} className="menu">
                      {data[0]}
                    </Link>
                  </li>
                  <li>
                    <Link to="/Restaurants" onClick={handleMenuItemClick} className="menu">
                      {data[1]}
                    </Link>
                  </li>
                  <li>
                    <Link to="/Happy-Hours" onClick={handleMenuItemClick} className="menu">
                      {data[2]}
                    </Link>
                  </li>
                  <li>
                    <Link to="/Food-Shops" onClick={handleMenuItemClick} className="menu">
                      {data[3]}
                    </Link>
                  </li>
                  <li>
                    <Link to="/Rentals" onClick={handleMenuItemClick} className="menu">
                      {data[4]}
                    </Link>
                  </li>
                  <li>
                    <Link to="/Spa" onClick={handleMenuItemClick} className="menu">
                      {data[5]}
                    </Link>
                  </li>
                  <li>
                    <Link to="/SkiLifts" onClick={handleMenuItemClick} className="menu">
                      {data[6]}
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.3bmeteo.com/meteo/livigno" target="_blank" onClick={handleMenuItemClick} className="menu">
                      {data[7]}
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.livigno.eu/eventi" target="_blank" onClick={handleMenuItemClick} className="menu">
                      {data[8]}
                    </Link>
                  </li>
                </>
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
        </div>

        {/* Burger Menu Button */}
        <button onClick={menuClicked} className="xl:hidden flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Navigation Links (desktop view) */}
        <div className="hidden xl:flex space-x-8">
          {data ? (
            <>
              <Link to="/" onClick={handleMenuItemClick} className="menu">
                {data[0]}
              </Link>
              <Link to="/Restaurants" onClick={handleMenuItemClick} className="menu">
                {data[1]}
              </Link>
              <Link to="/Happy-Hours" onClick={handleMenuItemClick} className="menu">
                {data[2]}
              </Link>
              <Link to="/Food-Shops" onClick={handleMenuItemClick} className="menu">
                {data[3]}
              </Link>
              <Link to="/Rentals" onClick={handleMenuItemClick} className="menu">
                {data[4]}
              </Link>
              <Link to="/Spa" onClick={handleMenuItemClick} className="menu">
                {data[5]}
              </Link>
              <Link to="/SkiLifts" onClick={handleMenuItemClick} className="menu">
                {data[6]}
              </Link>
              <Link to="https://www.3bmeteo.com/meteo/livigno" target="_blank" onClick={handleMenuItemClick} className="menu">
                {data[7]}
              </Link>
              <Link to="https://www.livigno.eu/eventi" target="_blank" onClick={handleMenuItemClick} className="menu">
                {data[8]}
              </Link>
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppBar;

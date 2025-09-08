

import { useState } from "react";
import { FaUserCircle, FaBell, FaHome, FaListUl, FaHeart, FaCog } from "react-icons/fa";
import { TbFileReport } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarLayout() {
  const tokenFromLs = JSON.parse(localStorage.getItem("userToken"));
  const Navigate = useNavigate();

  return (
    <div className="relative mb-10 bg-gray-100">

      {/* Top Navbar (Mobile) */}
      <div className="fixed top-0 left-0 w-full bg-gray-200 border-b border-black flex items-center justify-between gap-10 px-4 py-2 z-50 sm:hidden">
        <h1>D-Tracker</h1>

        <div className="flex items-center gap-3">
          {tokenFromLs ? (
            <>
              <button onClick={() => Navigate("/profile")}>
                <FaUserCircle className="text-blue-500 text-2xl" />
              </button>
              <button onClick={() => Navigate("/notifications")}>
                <FaBell className="text-blue-500 text-2xl" />
              </button>
            </>
          ) : (
            <button onClick={() => Navigate("/login")} className="text-blue-500 font-semibold">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main Navbar (Desktop) */}
      <div className="hidden sm:flex justify-between items-center bg-white border-b border-black px-6 py-3 fixed top-0 left-0 w-full z-40">
        <h1 className="text-lg font-bold text-black">D-Tracker</h1>
        <ul className="flex gap-6 text-gray-600">
          {tokenFromLs ? (
            <>
              <Link to="/about" className="hover:text-blue-500">Your-Items</Link>
              <Link to="/Check-Expires" className="hover:text-blue-500">Check-Expires</Link>
              <Link to="/ourstore" className="hover:text-blue-500">Our-Store</Link>
              <Link to="/notifications" className="hover:text-blue-500">Notifications</Link>
              <Link to="/UdhaarForm" className="hover:text-blue-500">Add Udhaar</Link>
              <Link to="/bluetoothprinter" className="hover:text-blue-500">PrintSettings</Link>
              <Link to="/addownstore" className="hover:text-blue-500">AddStore</Link>
              <Link to="/profile" className="hover:text-blue-500">Profile</Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-500">Login</Link>
          )}
        </ul>
      </div>

      {/* Bottom Navbar (Mobile) */}
      {tokenFromLs && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-black p-4 overflow-x-auto sm:hidden z-50">
          <div className="flex justify-start space-x-6 px-4 py-1 min-w-max">
            <button onClick={() => Navigate("/about")} className="flex flex-col items-center text-black">
              <FaListUl className="text-lg" />
              <span className="text-xs">Your-Items</span>
            </button>
            <button onClick={() => Navigate("/check-Expires")} className="flex flex-col items-center text-black">
              <FaHeart className="text-lg" />
              <span className="text-xs">Check-Expires</span>
            </button>
            <button onClick={() => Navigate("/ourstore")} className="flex flex-col items-center text-black">
              <FaCog className="text-lg" />
              <span className="text-xs">Our-Store</span>
            </button>
            <button onClick={() => Navigate("/udhaarform")} className="flex flex-col items-center text-black">
              <TbFileReport className="text-lg" />
              <span className="text-xs">UdhaarForm</span>
            </button>
            <button onClick={() => Navigate("/bluetoothprinter")} className="flex flex-col items-center text-black">
              <FaCog className="text-lg" />
              <span className="text-xs">PrintItems</span>
            </button>
            <button onClick={() => Navigate("/addownstore")} className="flex flex-col items-center text-black">
              <FaHome className="text-lg" />
              <span className="text-xs">AddStore</span>
            </button>
          </div>
        </div>
      )}

      {/* Show only login button on mobile if not logged in */}
      {!tokenFromLs && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-black p-4 sm:hidden z-50 flex justify-center">
          <button onClick={() => Navigate("/login")} className="text-blue-500 font-semibold">
            Login
          </button>
        </div>
      )}
    </div>
  );
}

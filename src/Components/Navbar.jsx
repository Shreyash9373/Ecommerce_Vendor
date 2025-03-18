import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiMenu, HiX, HiHome } from "react-icons/hi";
import { clearVendor } from "../redux/slices/vendorSlice";
import {
  FaShoppingCart,
  FaCubes,
  FaClipboardList,
  FaUser,
  FaUsers,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = ({ vendor }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    dispatch(clearVendor()); // Clear Redux state
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-800 text-white sticky top-0 shadow-md z-50 w-full p-4 flex justify-between items-center">
        {/* Toggle Sidebar Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Logo */}
        <NavLink to="/dashboard" className="text-base md:text-lg lg:text-xl font-bold">
          Vendor Dashboard
        </NavLink>

        {/* Vendor Info & Logout */}
        {vendor && (
          <div className="flex w-28 flex-col items-end gap-4 relative group">
            {/* Profile Section */}
            <div className="cursor-pointer">
              <img
                src={vendor.avatar}
                alt=""
                className="h-12 w-12 bg-gray-300 object-cover rounded-full"
              />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-12 right-0 w-36 bg-white shadow-md rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity ease-in-out duration-300">
              <ul className="text-black py-2">
                {/* <li>
                  <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
                    Dashboard
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-red-600 px-4 py-2 hover:bg-red-100"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5 z-50 md:hidden">
          {/* Toggle Button  */}
          <button
            className="absolute top-4 right-4 text-2xl text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX />
          </button>
          <ul className="mt-8 space-y-4">
            <li>
              <NavLink
                to="/"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <HiHome className="text-lg" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ecommerce"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FaShoppingCart className="text-lg" />
                Ecommerce
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/category"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FaCubes className="text-lg" />
                Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FaClipboardList className="text-lg" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FaUser className="text-lg" />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roles"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FaUsers className="text-lg" />
                Roles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                onClick={() => setSidebarOpen(false)}
              >
                <FaChartPie className="text-lg" />
                Reports
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;

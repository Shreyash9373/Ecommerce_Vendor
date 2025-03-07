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
      <nav className="bg-green-800 text-white sticky top-0 shadow-md z-50 w-full p-4 flex justify-between items-center">
        {/* Toggle Sidebar Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          Remos
        </NavLink>

        {/* Vendor Info & Logout */}
        {vendor && (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Welcome, {vendor.name}!</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            >
              <FaSignOutAlt />
              Logout
            </button>
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

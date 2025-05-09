import { useState } from "react";
import {
  FaShoppingCart,
  FaCubes,
  FaClipboardList,
  FaUser,
  FaUsers,
  FaChartPie,
} from "react-icons/fa";
import { HiHome, HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed mt-20  top-0 left-0 w-64 text-lg flex flex-col items-start border-r border-gray-300 bg-white h-screen p-3 shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ transition: "transform 0.3s ease-in-out" }} // Ensure smooth transition
      >
        {/* <div className="flex justify-between items-center w-full mb-8 mt-4 md:mt-0">
          <h2 className="text-xl font-semibold text-gray-700">Menu</h2>
          <button className="md:hidden text-gray-500" onClick={() => toggleSidebar(false)}>
            ✖
          </button>
        </div> */}

        <nav className=" w-full">
          <ul className=" h-full space-y-4">
            {[
              { to: "/dashboard", icon: <HiHome />, label: "Dashboard" },
              { to: "/view-products", icon: <FaShoppingCart />, label: "View Products" },
              { to: "/add-product", icon: <FaCubes />, label: "Add Product" },
              { to: "/manage-orders", icon: <FaClipboardList />, label: "Manage Orders" },
              { to: "/payment-earnings", icon: <FaUser />, label: "Payment & Earnings" },
              { to: "/store", icon: <FaUsers />, label: "Store Overview" },
              // { to: "/reviews", icon: <FaChartPie />, label: "Review & Ratings" },
            ].map(({ to, icon, label }) => (
              <li key={to} className="w-full">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md w-full transition-all md:text-lg text-xl ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => toggleSidebar(false)}
                >
                  <span className="text-xl">{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed  inset-0 bg-black opacity-50  z-30 md:hidden transition-opacity duration-300"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}

      {/* Hamburger Menu (Mobile Only) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          className="text-2xl bg-transparent text-transparent"
          onClick={() => toggleSidebar(!isOpen)}
        >
          <HiMenuAlt3 />
        </button>
      </div>
    </>
  );
};

export default Sidebar;

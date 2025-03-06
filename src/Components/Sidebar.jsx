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
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-screen p-5 shadow-md z-30 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-full text-white text-xl font-bold">
              R
            </div>
            <h1 className="text-xl font-semibold">Remos</h1>
          </div>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-gray-500"
            onClick={() => toggleSidebar(false)}
          >
            ✖
          </button>
        </div>

        <nav>
          <ul className="space-y-4">
            {[
              { to: "/", icon: <HiHome />, label: "Dashboard" },
              {
                to: "/ecommerce",
                icon: <FaShoppingCart />,
                label: "Ecommerce",
              },
              { to: "/category", icon: <FaCubes />, label: "Category" },
              { to: "/orders", icon: <FaClipboardList />, label: "Orders" },
              { to: "/users", icon: <FaUser />, label: "Users" },
              { to: "/roles", icon: <FaUsers />, label: "Roles" },
              { to: "/reports", icon: <FaChartPie />, label: "Reports" },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-500"
                  onClick={() => toggleSidebar(false)} // Close on click (mobile)
                >
                  <span className="text-lg">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClipboardList,
  FaMoneyBillWave,
  FaBoxes,
  FaUsers,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

const VendorInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/vendor-insights?month=${month}&year=${year}`,
          { withCredentials: true }
        );
        setInsights(res.data.data);
        // console.log("object", res.data.data);
      } catch (err) {
        // console.error(err);
        setError("Failed to fetch vendor insights.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [month, year]);

  const cardData = insights
    ? [
        {
          title: "Total Orders",
          value: insights.totalOrders,
          icon: <FaClipboardList className="text-white text-2xl" />,
          bgColor: "bg-indigo-600",
        },
        {
          title: "Total Revenue",
          value: `₹${insights.totalRevenue.toFixed(2)}`,
          icon: <FaMoneyBillWave className="text-white text-2xl" />,
          bgColor: "bg-green-600",
        },
        {
          title: "Units Sold",
          value: insights.unitsSold,
          icon: <FaBoxes className="text-white text-2xl" />,
          bgColor: "bg-yellow-500",
        },
        {
          title: "New Customers",
          value: insights.newCustomers,
          icon: <FaUsers className="text-white text-2xl" />,
          bgColor: "bg-blue-500",
        },
        {
          title: "Avg Order Value",
          value: `₹${insights.averageOrderValue.toFixed(2)}`,
          icon: <FaChartLine className="text-white text-2xl" />,
          bgColor: "bg-purple-600",
        },
        {
          title: "Last Login",
          value: new Date(insights.lastLogin).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          icon: <FaClock className="text-white text-2xl" />,
          bgColor: "bg-fuchsia-500",
        },
      ]
    : [];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Monthly Vendor Insights</h2>

      {loading && <p>Loading insights...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && insights && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-2xl shadow-md text-white ${card.bgColor}`}
            >
              <div>
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
              <div className="ml-4">{card.icon}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorInsights;

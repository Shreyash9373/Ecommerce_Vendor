import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const ErrorMessage = ({ message = "Failed to load data." }) => (
  <div className="flex items-center justify-center h-full text-red-500">
    <p>{message}</p>
  </div>
);

export const Order = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [doughnutData, setDoughnutData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false); // ✅ Added flag to track empty data

  const yearOptions = Array.from({ length: 4 }, (_, i) => today.getFullYear() - 2 + i);

  useEffect(() => {
    const fetchUnitsData = async () => {
      try {
        setLoading(true);
        setError(null);
        setDoughnutData(null);
        setTotalOrders(0);
        setNoData(false); // ✅ Reset noData flag

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/order-status?month=${month}&year=${year}`,
          { withCredentials: true }
        );

        console.log("Res:", res.data?.data);
        const response = res.data?.data?.orderStatus?.[0];

        if (response && response.labels?.length && response.data?.length) {
          // ✅ Valid order data found
          const { labels, data, total } = response;

          setDoughnutData({
            labels,
            datasets: [
              {
                label: "Order Status",
                data,
                backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"],
                borderWidth: 1,
              },
            ],
          });
          setTotalOrders(total);
        } else {
          // ✅ Empty data - show a neutral doughnut chart
          setDoughnutData({
            labels: ["No Orders"],
            datasets: [
              {
                label: "Order Status",
                data: [1], // Dummy data
                backgroundColor: ["#E5E7EB"], // Gray color for empty chart
                borderWidth: 1,
              },
            ],
          });
          setTotalOrders(0);
          setNoData(true); // ✅ Mark no data
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnitsData();
  }, [month, year]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Status Overview</h2>

        {/* Month & Year Selectors */}
        <div className="flex gap-4 items-end">
          <div>
            <label htmlFor="month" className="block text-xs text-gray-500 mb-1">
              Month
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(+e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "short" })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="block text-xs text-gray-500 mb-1">
              Year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(+e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="flex flex-col items-center justify-center h-80">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#4B5563",
                      boxWidth: 14,
                      padding: 16,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return noData ? "No Orders" : `${context.label}: ${context.raw}`;
                      },
                    },
                  },
                },
              }}
            />
            {noData ? (
              <p className="mt-4 text-sm text-gray-500 italic">
                No orders available for this month.
              </p> // ✅ Styled message
            ) : (
              <p className="my-4 text-sm text-gray-600">
                Total Orders: <span className="font-medium">{totalOrders}</span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

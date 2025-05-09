import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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

export const OrdersCustomersChart = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [comboData, setComboData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const yearOptions = Array.from({ length: 4 }, (_, i) => today.getFullYear() - 2 + i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setComboData(null);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/order-customers?month=${month}&year=${year}`,
          { withCredentials: true }
        );

        const response = res.data?.data;
        // console.log("Combo Chart Response:", response);

        if (response?.labels?.length && response?.orders?.length && response?.customers?.length) {
          setComboData({
            labels: response.labels,
            datasets: [
              {
                type: "bar",
                label: "Orders",
                data: response.orders,
                backgroundColor: "#6366F1",
                borderRadius: 5,
                yAxisID: "y",
              },
              {
                type: "line",
                label: "New Customers",
                data: response.customers,
                borderColor: "#10B981",
                backgroundColor: "#10B981",
                fill: false,
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 4,
                yAxisID: "y1",
              },
            ],
          });
        } else {
          setError("No data available for this month.");
        }
      } catch (err) {
        // console.error(err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563",
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Orders",
        },
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Customers",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Orders vs Customers</h2>

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
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && comboData && <Chart type="bar" data={comboData} options={options} />}
      </div>
    </div>
  );
};

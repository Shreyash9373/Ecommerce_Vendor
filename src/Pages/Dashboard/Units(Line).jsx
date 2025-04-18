import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const ErrorMessage = ({ message = "Failed to load data." }) => (
  <div className="flex items-center justify-center h-full text-red-500">
    <p>{message}</p>
  </div>
);

export const Units = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnitsData = async () => {
      setLoading(true);
      setError(null);
      setChartData(null);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/month-units?month=${month}&year=${year}`,
          { withCredentials: true }
        );

        if (res.data?.success && res.data.data?.labels && res.data.data?.data) {
          const { labels, data: unitsData } = res.data.data;

          const ctx = document.createElement("canvas").getContext("2d");
          const gradient = ctx ? ctx.createLinearGradient(0, 0, 0, 300) : "rgba(16, 185, 129, 0.1)";
          if (ctx) {
            gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)");
            gradient.addColorStop(1, "rgba(16, 185, 129, 0.05)");
          }

          setChartData({
            labels,
            datasets: [
              {
                label: "Units Sold",
                data: unitsData,
                fill: true,
                borderColor: "#10b981", // emerald-500
                backgroundColor: gradient,
                tension: 0.4,
                pointBackgroundColor: "#10b981",
                pointBorderColor: "#ffffff",
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#ffffff",
                pointHoverBorderColor: "#10b981",
                pointHoverBorderWidth: 2,
                pointRadius: 4,
              },
            ],
          });
        } else {
          setError("Invalid data format from server.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching unit data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnitsData();
  }, [month, year]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Units Sold: ${context.parsed.y}`;
          },
          title: function (tooltipItems) {
            return tooltipItems[0]?.label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          color: "#6b7280",
        },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        title: {
          display: true,
          text: "Units Sold",
          font: { size: 12, weight: "medium" },
          color: "#4b5563",
          padding: { top: 0, bottom: 10 },
        },
        ticks: {
          color: "#6b7280",
        },
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const yearOptions = Array.from({ length: 4 }, (_, i) => today.getFullYear() - 2 + i);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Units Sold Overview</h2>

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

      <div className="relative h-72 sm:h-80">
        {loading && <LoadingSpinner />}
        {error && !loading && <ErrorMessage message={error} />}
        {!loading && !error && chartData && <Line data={chartData} options={options} />}
        {!loading && !error && !chartData && (
          <div className="flex items-center justify-center h-full text-gray-400">
            No unit data available for this period.
          </div>
        )}
      </div>
    </div>
  );
};

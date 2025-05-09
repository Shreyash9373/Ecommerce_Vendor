// Enhanced Sales Chart Component with modern UI
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
  <div className="flex justify-center items-center h-full">
    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-red-500 text-sm text-center py-4">{message}</div>
);

export const Sales = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: res } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/month-sales?month=${month}&year=${year}`,
        { withCredentials: true }
      );

      if (res?.success && res.data?.labels && res.data?.data) {
        const { labels, data: salesData } = res.data;

        const ctx = document.createElement("canvas").getContext("2d");
        const gradient = ctx
          ? (() => {
              const g = ctx.createLinearGradient(0, 0, 0, 300);
              g.addColorStop(0, "rgba(99, 102, 241, 0.3)");
              g.addColorStop(1, "rgba(99, 102, 241, 0.05)");
              return g;
            })()
          : "rgba(99, 102, 241, 0.1)";

        setChartData({
          labels,
          datasets: [
            {
              data: salesData,
              fill: true,
              borderColor: "#6366f1",
              backgroundColor: gradient,
              tension: 0.4,
              pointBackgroundColor: "#6366f1",
              pointBorderColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
      } else {
        throw new Error(res?.message || "Unexpected API structure");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [month, year]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx) =>
            `Sales: ${new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(ctx.parsed.y)}`,
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
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6b7280",
          callback: (value) => `₹${value}`,
        },
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  const yearOptions = Array.from({ length: 5 }, (_, i) => today.getFullYear() - 2 + i);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Monthly Sales</h2>

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

      {/* Chart */}
      <div className="relative h-72 sm:h-80">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="text-gray-400 text-sm text-center">No data available.</p>
        )}
      </div>
    </div>
  );
};

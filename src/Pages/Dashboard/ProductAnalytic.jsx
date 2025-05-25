import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaRupeeSign, FaStar, FaImage } from "react-icons/fa";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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

const ProductAnalytic = () => {
  const location = useLocation();
  const { product: navigatedProduct } = location.state || {}; // Get product data from navigation state
  const { id } = useParams();
  const navigate = useNavigate();

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const yearOptions = Array.from({ length: 4 }, (_, i) => year - 2 + i);

  const [product, setProduct] = useState(navigatedProduct || null);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(!navigatedProduct);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setChartData(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/product-analytic?productId=${id}&month=${month}&year=${year}`,
          { withCredentials: true }
        );
        console.log("Res:", res.data);
        if (res.data?.success && res.data.data?.labels && res.data.data?.data) {
          const { labels, data: unitsData } = res.data.data;

          setStats(res.data.data.product);
          console.log(res.data.data.product, "stats:", stats);
          console.log("Stats:", stats);

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
                label: "Units Sold per month",
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

    fetchProduct();
  }, [id, navigatedProduct, month, year]);

  console.log("useState:", product, "useLocation:", navigatedProduct);

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
          text: "Units Sold per month",
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

  return (
    <div className="pb-5 p-4">
      {/* Product Card */}
      {product && (
        <div className="max-w-4xl mx-auto pb-6">
          <div className="flex gap-6 items-center bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {product.image?.[0] ? (
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                <FaImage size={32} />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <div className="flex items-center flex-wrap gap-x-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <FaBoxOpen className="text-indigo-500" />
                  {product.totalUnitsSold} sold
                </span>
                <span className="flex items-center gap-1">
                  <FaRupeeSign className="text-green-500" />
                  {product.totalRevenue.toLocaleString("en-IN")}
                </span>
              </div>
              {stats ? (
                <div className="flex items-center flex-wrap gap-x-4 text-sm text-gray-600 mt-2">
                  {stats.averageRating != 0 && (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FaStar />
                      {stats.averageRating.toFixed(1)} / 5
                    </span>
                  )}
                  {stats.stock && (
                    <span className="flex font-semibold items-center gap-1 text-blue-500">
                      Remaining Stocks: {stats.stock}
                    </span>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Sold Products Overview</h2>
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
      <div className="relative h-72 sm:h-80 border rounded-lg p-4 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No unit data available for this period.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAnalytic;

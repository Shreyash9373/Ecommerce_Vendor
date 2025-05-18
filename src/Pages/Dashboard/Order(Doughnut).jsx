import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaRupeeSign, FaStar, FaImage } from "react-icons/fa";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProductAnalytic = () => {
  const location = useLocation();
  const { product: navigatedProduct } = location.state || {};
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(navigatedProduct || null);
  const [loading, setLoading] = useState(!navigatedProduct);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!product) {
      setTimeout(() => {
        setError("Product not found");
        setLoading(false);
      }, 1000);
    } else {
      // Fake chart data
      const fakeSalesData = [
        { day: "Mon", units: 5 },
        { day: "Tue", units: 8 },
        { day: "Wed", units: 3 },
        { day: "Thu", units: 10 },
        { day: "Fri", units: 6 },
      ];

      const data = {
        labels: fakeSalesData.map((entry) => entry.day),
        datasets: [
          {
            label: "Units Sold",
            data: fakeSalesData.map((entry) => entry.units),
            borderColor: "#6366F1", // Indigo
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      };

      setChartData(data);
      setLoading(false);
    }
  }, [product]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Product Analytics</h2>

      {loading ? (
        <p className="text-sm text-gray-600 text-center animate-pulse">Loading insights...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : !product ? (
        <p className="text-sm text-gray-500 text-center">No data available for this period.</p>
      ) : (
        <>
          {/* Product Info Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-lg p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition">
              {product.image ? (
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 rounded">
                  <FaImage size={24} />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <FaBoxOpen className="text-indigo-500" /> {product.totalUnitsSold} sold
                  <FaRupeeSign className="text-green-500 ml-2" />{" "}
                  {product.totalRevenue.toLocaleString("en-IN")}
                </div>
                {product.averageRating && (
                  <div className="flex items-center text-xs text-yellow-500 mt-1">
                    <FaStar className="mr-1" /> {product.averageRating.toFixed(1)} / 5
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart Section */}
          {chartData && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Units Sold (Last 5 Days)</h4>
              <div className="w-full h-64">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductAnalytic;

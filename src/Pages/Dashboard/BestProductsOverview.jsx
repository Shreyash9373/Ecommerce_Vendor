import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxOpen, FaRupeeSign, FaStar, FaImage } from "react-icons/fa";

const BestProductsOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const yearOptions = Array.from({ length: 4 }, (_, i) => year - 2 + i);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/best-products?month=${month}&year=${year}`,
          { withCredentials: true }
        );

        if (res.data?.success && Array.isArray(res.data.data.topProducts)) {
          setProducts(res.data.data.topProducts);
          // console.log("best products:", res.data.data.topProducts);
        } else {
          throw new Error("No products found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestProducts();
  }, [month, year]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Best Products Overview</h2>
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

      {/* Content */}
      {loading ? (
        <p className="text-sm text-gray-600 text-center">Loading insights...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-500 text-center">No data available for this period.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition"
            >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default BestProductsOverview;

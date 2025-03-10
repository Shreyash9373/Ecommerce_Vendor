import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/getAll-Products`,
          { withCredentials: true }
        );
        console.log("All Products", response.data.data);
        setProducts(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const goToProductDetail = (product) => {
    navigate(`/product/${product._id}`, { state: { product } }); // Pass event data as state
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg shadow p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 object-contain rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <button
            // onClick={() => navigate(`/product/${product._id}`)}
            onClick={() => goToProductDetail(product)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Full Info
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewProducts;

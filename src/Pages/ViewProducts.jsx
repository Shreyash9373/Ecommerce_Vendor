import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PiDotsThreeOutline } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open
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
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const unlistProduct = async (productId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/update-Product/${productId}`,
        { status: "unlisted" },
        {
          withCredentials: true,
        }
      );

      console.log("Response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    // try {
    //   const response = await axios.put(
    //     `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/update-Product/${productId}`,
    //     { status: "unlisted" },
    //     {
    //       withCredentials: true,
    //     }
    //   );

    //   console.log("Response", response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("Product Deleted:", productId);
  };

  const toggleMenu = (productId) => {
    setOpenMenu((prev) => (prev === productId ? null : productId));
  };

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow p-2 bg-white relative flex flex-col justify-between"
        >
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 object-contain rounded"
          />

          {/* Product Details */}
          <div className="mt-2">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">₹{product.price.toLocaleString()}</p>
          </div>

          {/* Three Dots Menu at Bottom Right */}
          <div className="flex justify-end mt-4 relative">
            <button
              onClick={() => toggleMenu(product._id)}
              className="text-xl rounded-full hover:bg-gray-200 transition"
            >
              {openMenu === product._id ? <IoClose /> : <PiDotsThreeOutline />}
            </button>

            {/* Dropdown Menu */}
            {openMenu === product._id && (
              <div className="absolute bottom-full right-0 mb-2 w-40 bg-white shadow-lg rounded-lg border z-10">
                <button
                  onClick={() => goToProductDetail(product)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-teal-700"
                >
                  ✏️ View
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  🗑️ Delete
                </button>
                {/* <button
                  onClick={() => unlistProduct(product._id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-yellow-500"
                >
                  🚫 Unlist
                </button> */}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewProducts;

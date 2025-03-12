import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const location = useLocation();
  const { product: navigatedProduct } = location.state || {}; // Get product data from navigation state
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(navigatedProduct || null);
  const [loading, setLoading] = useState(!navigatedProduct);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");

  useEffect(() => {
    if (!navigatedProduct) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/api/v1/get-product/${id}`,
            { withCredentials: true }
          );
          setProduct(response.data.product);
          setMainImage(response.data.product.images[0]);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, navigatedProduct]);

  const goToUpdateProduct = (product) => {
    navigate(`/edit-product/${product._id}`, { state: { product } }); // Pass event data as state
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.name}
                className="w-20 h-20 object-cover rounded cursor-pointer border shadow hover:opacity-75"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-medium mt-2">
            Category:{" "}
            <span className="text-gray-700">
              {product.category} / {product.subCategory}
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            Brand: <span className="text-gray-700">{product.brand}</span>
          </p>
          <p className="text-lg font-medium mt-2">
            Store: <span className="text-gray-700">{product.storeName}</span>
          </p>
          <p className="text-lg font-medium mt-2">
            Stock:{" "}
            <span className={`text-${product.stock > 0 ? "green" : "red"}-600`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            Weight: <span className="text-gray-700">{product.weight} grams</span>
          </p>
          <p className="text-lg font-medium mt-2">
            Dimensions:{" "}
            <span className="text-gray-700">
              {product.dimensions.height} x {product.dimensions.width} x {product.dimensions.depth}{" "}
              cm
            </span>
          </p>

          {/* Pricing */}
          <div className="mt-4">
            <p className="text-xl font-semibold text-gray-800">
              Price: <span className="line-through text-red-500">${product.price}</span>{" "}
              <span className="text-green-600">₹{product.finalPrice}</span>
            </p>
            <p className="text-sm text-gray-500">Discount: {product.discount}%</p>
          </div>

          {/* Attributes */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Attributes:</h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              {product.attributes &&
                Object.entries(product.attributes).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Tags:</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags &&
                product.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                    #{tag}
                  </span>
                ))}
            </div>
          </div>

          {/* View More Button */}
          <button
            onClick={() => goToUpdateProduct(product)}
            className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg font-semibold"
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

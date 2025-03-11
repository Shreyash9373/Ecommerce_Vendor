import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

const ManageOrder = () => {
  const [orders, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/order/get-order`,
          {
            withCredentials: true,
          }
        );
        console.log("RE:", response.data.data.orders);
        setOrder(response.data.data.orders);
        setValue("status", response.data.status);
      } catch (err) {
        console.log("ERR: ", err);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log("Form Data : ", data);
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
        >
          <p className="font-semibold text-lg mb-2">Order ID: {order._id}</p>

          <div className="mb-4 p-3 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Shipping Address:</h3>
            <p>
              <span className="font-medium">Street:</span> {order.shippingAddress.street}
            </p>
            <p>
              <span className="font-medium">City:</span> {order.shippingAddress.city}
            </p>
            <p>
              <span className="font-medium">State:</span> {order.shippingAddress.state}
            </p>
            <p>
              <span className="font-medium">ZIP Code:</span> {order.shippingAddress.zip}
            </p>
            <p>
              <span className="font-medium">Country:</span> {order.shippingAddress.country}
            </p>
          </div>

          <p className="mb-4 text-gray-700">
            <span className="font-semibold">Current Status:</span> {order.status}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Controller
              name={`status-${order._id}`}
              control={control}
              defaultValue={order.status}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              )}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
            >
              Update Status
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default ManageOrder;

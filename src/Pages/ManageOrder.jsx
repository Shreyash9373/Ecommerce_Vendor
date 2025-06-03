import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaBox, FaMapMarkedAlt, FaMoneyBill, FaExchangeAlt } from "react-icons/fa";
import { MdOutlinePendingActions, MdLocalShipping, MdDone, MdCancel } from "react-icons/md";

const statusIcons = {
  Pending: <MdOutlinePendingActions className="inline mr-1 text-yellow-600" />,
  Processing: <FaExchangeAlt className="inline mr-1 text-blue-500" />,
  Shipped: <MdLocalShipping className="inline mr-1 text-purple-500" />,
  Delivered: <MdDone className="inline mr-1 text-green-500" />,
  Completed: <MdDone className="inline mr-1 text-green-700" />,
  Cancelled: <MdCancel className="inline mr-1 text-red-500" />,
};

const ManageOrder = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const [activeTab, setActiveTab] = useState("Processing");

  const fetchOrders = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/order/order-status`,
        {
          params: { status },
          withCredentials: true,
        }
      );
      setOrders(response.data.data.orders);
      // console.log(response.data.data.orders);
    } catch (err) {
      setError("Failed to fetch order details.", err);
      // console.log("Failed to fetch order details.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `₹{import.meta.env.VITE_BACKEND_URI}/api/v1/order/update-OrderStatus`,
        data,
        {
          withCredentials: true,
        }
      );
      // console.log("RR:", response);

      fetchOrders(activeTab); // Refresh orders
    } catch (error) {
      setError("Failed to update order status.", error);
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-semibold mb-6">Manage Orders</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["Processing", "Pending", "Shipped", "Delivered", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm ₹{
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {statusIcons[tab]} {tab}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
      {loading && <p className="text-gray-600">Loading orders...</p>}

      {orders?.length === 0 ? (
        <p className="text-center text-gray-500">No Orders Available</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <FaBox className="mr-2 text-blue-500" /> Order ID: {order._id}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-700 mb-2">Product Details</h4>
                  {order.items.map((item) => (
                    <div key={item._id} className="text-sm text-gray-800 mb-2">
                      <p>
                        <span className="font-medium">Name:</span> {item.productSnapshot.name}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span> ₹{item.productSnapshot.price}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span> {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-semibold text-gray-700 mb-2">Payment Details</h4>
                  <p>
                    <FaMoneyBill className="inline mr-2 text-green-500" /> Amount: ₹
                    {order.totalAmount}
                  </p>
                  <p>Method: {order.paymentMethod}</p>
                  <p>Status: {order.paymentStatus}</p>
                </div>
              </div>

              <div className="bg-gray-50 mt-4 p-4 rounded-md">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FaMapMarkedAlt className="mr-2 text-red-400" /> Shipping Address
                </h4>
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.zip},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Current Status:{" "}
                  <span className="font-semibold text-gray-800">{order.status}</span>
                </p>
                <form
                  onSubmit={handleSubmit((data) => {
                    const status = data[`status-₹{order._id}`];
                    const requestData = { status, id: order._id };
                    onSubmit(requestData);
                  })}
                  className="space-y-3"
                >
                  <select
                    {...register(`status-₹{order._id}`)}
                    defaultValue={order.status}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  >
                    {[
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Delivered",
                      "Cancelled",
                      "Completed",
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
                  >
                    Update Status
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrder;

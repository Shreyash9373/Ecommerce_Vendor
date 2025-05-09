import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/get-vendor`,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data.data);
        setVendor(response.data.data);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  if (loading) return <div className="flex justify-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img
          src={vendor?.avatar || "/default-avatar.png"}
          alt="Profile"
          className="w-36 h-36 rounded-full shadow-md object-cover"
        />
        <h2 className="text-xl font-semibold mt-4">{vendor?.name}</h2>
        <p className="text-gray-600">{vendor?.email}</p>
      </div>

      {/* Status  */}
      <div className="mt-4">
        <span className="font-medium">Status: </span>
        <span
          className={`px-2 py-1 rounded-lg text-white ${
            vendor?.status === "approved"
              ? "bg-green-500 capitalize"
              : vendor?.status === "pending"
                ? "bg-yellow-500 capitalize"
                : "bg-red-500 capitalize"
          }`}
        >
          {vendor?.status || "Unknown"}
        </span>
      </div>

      {/* Profile Details */}
      <div className="mt-6 space-y-4">
        <div className="border-b pb-2">
          <h3 className="text-gray-800 font-medium">Shop Name</h3>
          <p className="text-gray-600">{vendor?.storeName || "Not available"}</p>
        </div>

        <div className="border-b pb-2">
          <h3 className="text-gray-800 font-medium">Contact</h3>
          <p className="text-gray-600">{vendor?.phone || "No phone number added"}</p>
        </div>

        <div className="border-b pb-2">
          <h3 className="text-gray-800 font-medium">Total Order </h3>
          <p className="text-gray-600">{vendor?.totalOrders || "No Orders"}</p>
        </div>

        <div className="border-b pb-2">
          <h3 className="text-gray-800 font-medium">Total Order </h3>
          <p className="text-gray-600">{vendor?.totalSales || "No Sales"}</p>
        </div>

        <div className="border-b pb-2">
          <h3 className="text-gray-800 font-medium">Balance </h3>
          <p className="text-gray-600">{vendor?.withdrawableBalance || "No Balance"}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;

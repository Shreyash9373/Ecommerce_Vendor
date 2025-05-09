import React from "react";

export default function ContactInfo({ vendor }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            value={vendor.name}
            className="mt-1 p-2 border rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={vendor.email}
            className="mt-1 p-2 border rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Phone</label>
          <input
            type="text"
            value={vendor.phone}
            className="mt-1 p-2 border rounded w-full"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

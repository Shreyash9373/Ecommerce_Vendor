import React from "react";

export default function StoreProfile({ vendor }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Store Profile</h2>

      <div className="flex items-center gap-6">
        <img src={vendor.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Store Name</label>
            <input
              type="text"
              value={vendor.storeName}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Business Type</label>
            <input
              type="text"
              value={vendor.businessType}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

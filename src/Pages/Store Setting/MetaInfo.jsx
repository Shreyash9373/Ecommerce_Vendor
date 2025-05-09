import React from "react";

export default function MetaInfo({ vendor }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Meta Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Created At</label>
          <div className="mt-1 p-2 border rounded bg-gray-100">
            {new Date(vendor.createdAt).toLocaleString()}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600">Last Updated</label>
          <div className="mt-1 p-2 border rounded bg-gray-100">
            {new Date(vendor.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

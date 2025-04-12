import React from "react";

export default function EarningsPage({ vendor }) {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">Earnings Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Earnings" value={`₹${vendor.totalSalesAmount}`} color="bg-green-500" />
        <Card title="Total Sales" value={`₹${vendor.totalSalesAmount}`} color="bg-purple-500" />
        <Card title="Total Orders" value={vendor.totalOrders} color="bg-orange-500" />
        <Card title="Customer Count" value={vendor.customerCount} color="bg-blue-500" />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`rounded-2xl shadow-md p-6 text-white ${color}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

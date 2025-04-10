import React from "react";

export default function PaymentsPage({ vendor }) {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">Payments Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Withdrawable Balance"
          value={`₹${vendor.withdrawableBalance}`}
          color="bg-blue-600"
        />
        <Card title="Pending Orders" value={vendor.pendingOrders} color="bg-red-500" />
        <Card title="Status" value={vendor.status} color="bg-gray-700" />
      </div>

      <div className="mt-10">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700">
          Request Withdrawal
        </button>
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

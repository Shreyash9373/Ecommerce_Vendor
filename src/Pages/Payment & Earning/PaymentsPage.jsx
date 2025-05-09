import React from "react";
import { FaMoneyBillAlt, FaClock, FaUserShield, FaCashRegister, FaMobileAlt } from "react-icons/fa";

export default function PaymentsPage({ vendor }) {
  const {
    withdrawableBalance,
    pendingOrders,
    status,
    codCount = 0,
    codAmount = 0,
    upiCount = 0,
    upiAmount = 0,
  } = vendor;

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">Payments Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Withdrawable Balance"
          value={`₹${withdrawableBalance}`}
          icon={<FaMoneyBillAlt />}
          color="bg-blue-600"
        />
        <Card title="Pending Orders" value={pendingOrders} icon={<FaClock />} color="bg-red-500" />
        {/* <Card title="Status" value={status} icon={<FaUserShield />} color="bg-gray-700" /> */}
        <Card
          title="COD Payments"
          value={`${codCount} orders / ₹${codAmount}`}
          icon={<FaCashRegister />}
          color="bg-purple-600"
        />
        <Card
          title="UPI Payments"
          value={`${upiCount} orders / ₹${upiAmount}`}
          icon={<FaMobileAlt />}
          color="bg-indigo-600"
        />
      </div>
    </div>
  );
}

function Card({ title, value, color, icon }) {
  return (
    <div className={`rounded-2xl shadow-md p-6 text-white ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-70">{icon}</div>
      </div>
    </div>
  );
}

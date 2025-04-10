import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentsPage from "./Payment & Earning/PaymentsPage";
import EarningsPage from "./Payment & Earning/EarningsPage";

export default function PaymentEarnings() {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/get-vendor`,
          {
            withCredentials: true,
          }
        );
        setVendor(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.error("Failed to fetch vendor", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  if (loading) return <div className="p-6">Loading vendor data...</div>;
  if (!vendor) return <div className="p-6 text-red-600">Failed to load vendor data.</div>;

  return (
    <div className="p-6 space-y-12">
      <EarningsPage vendor={vendor} />
      <PaymentsPage vendor={vendor} />
    </div>
  );
}

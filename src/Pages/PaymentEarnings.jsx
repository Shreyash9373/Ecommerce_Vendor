import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentsPage from "./Payment & Earning/PaymentsPage";
import EarningsPage from "./Payment & Earning/EarningsPage";

export default function PaymentEarnings() {
  const [payment, setPayment] = useState(null);
  const [earning, setEarning] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const earning = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/earning-overview`,
          {
            withCredentials: true,
          }
        );
        setEarning(earning.data.data);
        // console.log(earning.data.data);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/payment-overview`,
          {
            withCredentials: true,
          }
        );
        setPayment(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        // console.error("Failed to fetch vendor", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  if (loading) return <div className="p-6">Loading vendor data...</div>;
  if (!payment || !earning)
    return <div className="p-6 text-red-600">Failed to load vendor data.</div>;

  return (
    <div className="p-6 space-y-12">
      <EarningsPage vendor={earning} />
      <PaymentsPage vendor={payment} />
    </div>
  );
}

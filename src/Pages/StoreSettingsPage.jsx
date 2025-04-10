import React, { useEffect, useState } from "react";
import axios from "axios";
import StoreProfile from "./Store Setting/StoreProfile";
import ContactInfo from "./Store Setting/ContactInfo";
import VerificationSection from "./Store Setting/VerificationSection";
import MetaInfo from "./Store Setting/MetaInfo";
import StoreDetailsPage from "./Store Setting/StoreDetailsPage";

export default function StoreSettingsPage() {
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
      } catch (err) {
        console.error("Failed to fetch vendor", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  if (loading) return <div className="p-6">Loading settings...</div>;
  if (!vendor) return <div className="p-6 text-red-600">Failed to load vendor data.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      <h1 className="text-3xl font-bold">Store Settings</h1>
      {vendor ? (
        <>
          <StoreProfile vendor={vendor} />
          <StoreDetailsPage vendor={vendor} />
          <ContactInfo vendor={vendor} />
          <VerificationSection vendor={vendor} />
          <MetaInfo vendor={vendor} />
        </>
      ) : (
        <div className="p-6">Loading vendor info...</div>
      )}
    </div>
  );
}

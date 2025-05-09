import React, { useEffect, useState } from "react";
import axios from "axios";
import StoreProfile from "./Store Setting/StoreProfile";
import ContactInfo from "./Store Setting/ContactInfo";
import VerificationSection from "./Store Setting/VerificationSection";
import MetaInfo from "./Store Setting/MetaInfo";
import StoreDetailsPage from "./Store Setting/StoreDetailsPage";
import { FaStore, FaInfoCircle, FaAddressBook, FaShieldAlt, FaTags } from "react-icons/fa";

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
        // console.error("Failed to fetch vendor", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  if (loading) return <div className="p-6 text-lg font-medium">Loading settings...</div>;

  if (!vendor) return <div className="p-6 text-red-600 text-lg">Failed to load vendor data.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      <div className="flex items-center gap-3 mb-8">
        <FaStore className="text-4xl text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Store Overview</h1>
      </div>

      <SectionWrapper title="Store Profile" icon={<FaInfoCircle />}>
        <StoreProfile vendor={vendor} />
      </SectionWrapper>

      <SectionWrapper title="Store Details" icon={<FaTags />}>
        <StoreDetailsPage vendor={vendor} />
      </SectionWrapper>

      <SectionWrapper title="Contact Information" icon={<FaAddressBook />}>
        <ContactInfo vendor={vendor} />
      </SectionWrapper>

      <SectionWrapper title="Verification" icon={<FaShieldAlt />}>
        <VerificationSection vendor={vendor} />
      </SectionWrapper>

      <SectionWrapper title="Meta Information" icon={<FaTags />}>
        <MetaInfo vendor={vendor} />
      </SectionWrapper>
    </div>
  );
}

function SectionWrapper({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-xl text-blue-500">{icon}</div>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

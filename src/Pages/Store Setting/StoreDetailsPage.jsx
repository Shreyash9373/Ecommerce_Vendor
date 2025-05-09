import React from "react";

export default function StoreDetailsPage({ vendor }) {
  if (!vendor) {
    return <div className="p-6 text-red-600">Vendor data not available.</div>;
  }

  const { storeName, storeDescription, businessType, address, paymentMethods } = vendor;
  const { street, city, state, country, zipCode } = address || {};
  const { stripe, paypal, bankAccount } = paymentMethods || {};

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      <h1 className="text-3xl font-bold mb-6">Store Details</h1>

      {/* Store Info */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Store Information</h2>
        <div>
          <label className="text-sm text-gray-600">Store Name</label>
          <div className="p-2 mt-1 bg-gray-100 rounded">{storeName}</div>
        </div>
        {storeDescription && (
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <div className="p-2 mt-1 bg-gray-100 rounded">{storeDescription}</div>
          </div>
        )}
        <div>
          <label className="text-sm text-gray-600">Business Type</label>
          <div className="p-2 mt-1 bg-gray-100 rounded">{businessType}</div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <div>
          <strong>Street:</strong> {street || "—"}
        </div>
        <div>
          <strong>City:</strong> {city || "—"}
        </div>
        <div>
          <strong>State:</strong> {state || "—"}
        </div>
        <div>
          <strong>Country:</strong> {country || "—"}
        </div>
        <div>
          <strong>Zip Code:</strong> {zipCode || "—"}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Payment Methods</h2>

        {stripe && (
          <div>
            <label className="text-sm text-gray-600">Stripe</label>
            <div className="p-2 mt-1 bg-gray-100 rounded">{stripe}</div>
          </div>
        )}
        {paypal && (
          <div>
            <label className="text-sm text-gray-600">PayPal</label>
            <div className="p-2 mt-1 bg-gray-100 rounded">{paypal}</div>
          </div>
        )}
        {bankAccount && (
          <div className="space-y-1">
            <h4 className="font-medium">Bank Account</h4>
            <div>
              <strong>Name:</strong> {bankAccount.accountName || "—"}
            </div>
            <div>
              <strong>Number:</strong> {bankAccount.accountNumber || "—"}
            </div>
            <div>
              <strong>Bank:</strong> {bankAccount.bankName || "—"}
            </div>
            <div>
              <strong>IFSC:</strong> {bankAccount.ifscCode || "—"}
            </div>
          </div>
        )}
        {!stripe && !paypal && !bankAccount && (
          <p className="text-gray-500">No payment methods available.</p>
        )}
      </div>
    </div>
  );
}

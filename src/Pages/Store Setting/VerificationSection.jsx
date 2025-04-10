import React from "react";

export default function VerificationSection({ vendor }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Verification</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Status</label>
          <div className="mt-1 p-2 border rounded bg-gray-100">{vendor.status}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Documents</label>
          {vendor.verificationDocuments.length > 0 ? (
            <ul className="mt-2 list-disc list-inside">
              {vendor.verificationDocuments.map((doc, idx) => (
                <li key={idx}>
                  <a
                    href={doc}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No documents uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}



import React from "react";
import { useNavigate } from "react-router-dom";

const UdhaarForm = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 mb-20">
      <h1 className="text-2xl font-bold text-center mb-6">📒 Udhaar Management</h1>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <button
          onClick={ ()=>navigate("/udhaarcheckform")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add Udhaar
        </button>
        <button
          onClick={()=>navigate("/udhaarlist")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          📋 Show All Udhaars
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-lg font-semibold mb-2">⏰ Remainder Alerts</h2>
          <p className="text-gray-600">
            View udhaars that are nearing their remainder date to remind customers on time.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold mb-2">⬆️ Low to High</h2>
          <p className="text-gray-600">
            Check the list of udhaars sorted from smallest to largest amounts.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-lg font-semibold mb-2">⭐ Priority Udhaars</h2>
          <p className="text-gray-600">
            Highlight bigger udhaars to track which customers owe you the most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UdhaarForm;

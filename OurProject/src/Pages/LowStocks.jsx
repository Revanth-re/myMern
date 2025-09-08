
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react"; // nice icon

const LowStocks = () => {
  const [lowStocks, setLowstocks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://mymern-e51y.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const filtered = response.data.filter((x) => x.productQuantity <= 10);
      setLowstocks(filtered);
    } catch (error) {
      console.error("Error fetching low stock data:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🚨 Low Stocks</h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

        {lowStocks.map((x, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 "
          >
            {/* ALERT ICON top-right */}
            <div className="absolute top-3 right-3 bg-black p-2 rounded-full shadow">
              <AlertTriangle className="text-red-600 w-10 h-10" />
            </div>

            <img
              src={
                x.base64 ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={x.productname}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {x.productname}
              </h2>
              <p className="text-gray-600">
                Quantity Left:{" "}
                <span className="font-bold text-red-600">
                  {x.productQuantity}
                </span>
              </p>

              {/* Info box */}
              <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded hidden md:block">
                <p className="text-sm font-medium  text-black">
                  ⚠️ Items are going out of stock. Need to order more products!
                </p>
              </div>
               <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded block md:hidden ">
                <p className="text-sm font-medium  text-black">
                 Stock Is Low... <br />
    Order More 
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStocks;

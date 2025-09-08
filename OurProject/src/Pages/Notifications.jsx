

import React, { useState, useEffect } from "react";
import axios from "axios";
import LowStocks from "./LowStocks";

const Notifications = () => {
  const [allData, setAllData] = useState([]);
  const [lowStocks, setLowStocks] = useState([]);
  const [error, setError] = useState(null);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://mymern-e51y.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const today = new Date();

      // Filter for products expiring within 7 days
      const NotifyData = response.data
        .map((item) => ({
          ...item,
          daysLeft: Math.floor(
            (new Date(item.ProductExpiry) - today) / (1000 * 60 * 60 * 24)
          ),
        }))
        .filter((item) => item.daysLeft >= 0 && item.daysLeft <= 7);

      setAllData(NotifyData);

      // Optional: get low stock items (<=10 quantity)
      const lowStockItems = response.data.filter((item) => item.productQuantity <= 10);
      setLowStocks(lowStockItems);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTips = (daysLeft) => {
    if (daysLeft <= 2) return "Offer heavy discounts or bundle with popular items.";
    if (daysLeft <= 5) return "Highlight as 'Fresh Stock – Limited Time Offer'.";
    return "Promote on social media and give small combo deals.";
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-md border border-red-200">
        <h2 className="text-lg font-bold">Oops! no products Found.</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4 mb-20">
      <LowStocks items={lowStocks} />

      <h1 className="text-2xl font-bold mb-6">Expiry Alerts (Next 7 Days)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allData.length === 0 ? (
          <p className="text-gray-500">No products expiring in the next 7 days.</p>
        ) : (
          allData.map((x, index) => {
            try {
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
                >
                  <img
                    src={
                      x.base64 ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAA..."
                    }
                    alt={x.productname}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{x.productname}</h2>
                    <p className="text-gray-500">Expiry Date: {x.ProductExpiry}</p>
                    <p className="text-red-500 font-medium">Days Left: {x.daysLeft}</p>
                    <p className="text-gray-600">Quantity Left: {x.productQuantity}</p>

                    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-sm font-medium text-yellow-700">💡 Tips to Sell:</p>
                      <p className="text-sm text-gray-700">{getTips(x.daysLeft)}</p>
                    </div>
                  </div>
                </div>
              );
            } catch (err) {
              console.error("Error rendering product:", err);
              return (
                <div
                  key={index}
                  className="bg-red-100 p-4 rounded shadow"
                >
                  Failed to render this product.
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;

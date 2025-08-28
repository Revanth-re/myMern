import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ExpiredProducts = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const FetchingData = async () => {
    try {
      const response = await axios.get("https://traxxx-5.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const today = new Date();
      const expired = response.data.filter((item) => {
        const expiryDate = new Date(item.ProductExpiry);
        return expiryDate < today; // ✅ Only expired products
      });

      setExpiredProducts(expired);

      // ✅ If you want to update expired products in backend:
      if (expired.length > 0) {
        await axios.put("api/updateItems", expired, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
      }
    } catch (err) {
      console.error("Error fetching expired products:", err);
    }
  };

  useEffect(() => {
    FetchingData();
  }, []);

  // 🔹 Loss Calculations
  let sellingLoss = 0;
  expiredProducts.forEach((x) => {
    sellingLoss += x.productActualPrice * (x.inpValue || 0);
  });

  let actualLoss = 0;
  expiredProducts.forEach((x) => {
    actualLoss += x.productActualPrice * x.productQuantity;
  });

  const totalLoss = actualLoss - sellingLoss;

  // 🔹 Chart Data
  const chartData = expiredProducts.map((item) => ({
    name: item.productname,
    loss: item.productQuantity * item.productActualPrice,
  }));

  const pieData = [
    { name: "Selling Loss", value: sellingLoss },
    { name: "Actual Loss", value: totalLoss },
  ];

  const COLORS = ["#FF8042", "#FF0000"];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
        📉 Loss Report - Expired Products
      </h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Expired Products</h2>
          <p className="text-2xl font-bold text-red-500">
            {expiredProducts.length}
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Actual-Loss</h2>
          <p className="text-2xl font-bold text-red-600">₹{totalLoss}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Total-Sales</h2>
          <p className="text-2xl font-bold text-yellow-600">₹{sellingLoss}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Amount-Spent</h2>
          <p className="text-2xl font-bold text-purple-600">₹{actualLoss}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Loss Per Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="loss" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Loss Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expired Products List */}
      
    </div>
  );
};

export default ExpiredProducts;

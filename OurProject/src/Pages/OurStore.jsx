
import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpiredProducts from "../Components/ExpiredProducts";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1E90FF", "#32CD32"]; // Blue for Spent, Green for Expected

const OurStore = () => {
  const [MoreData, setMoreData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalExpected, setTotalExpected] = useState(0);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const FetchingData = async () => {
    try {
      const response = await axios.get("https://mymern-e51y.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const today = new Date();

      // ✅ Filter only non-expired products
      const nonExpired = response.data.filter((item) => {
        const expiryDate = new Date(item.ProductExpiry);
        return expiryDate > today;
      });

      setMoreData(nonExpired);

      // ✅ Calculate totals
      let spent = 0;
      let expected = 0;

      nonExpired.forEach((item) => {
        const qty = Number(item.productQuantity) || 0;
        const actualPrice = Number(item.productActualPrice) || 0;
        const sellingPrice = Number(item.productSellingPrice) || 0;

        spent += actualPrice * qty;
        expected += sellingPrice * qty;
      });

      setTotalSpent(spent);
      setTotalExpected(expected);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchingData();
  }, []);

  // Chart data
  const chartData = [
    { name: "Spent", value: totalSpent },
    { name: "Expected", value: totalExpected },
  ];

  return (
    <div className="p-4 md:p-8 mb-18">
      <h1 className="text-2xl font-bold mb-6">📦 Our Store Summary</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">💰 Total Money Spent</h2>
          <p className="text-2xl font-bold text-blue-800">
            ₹{totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">📈 Expected Revenue</h2>
          <p className="text-2xl font-bold text-green-800">
            ₹{totalExpected.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">📊 Spent vs Expected (Bar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1E90FF">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">🥧 Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ExpiredProducts></ExpiredProducts>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MoreData.length > 0 ? (
          MoreData.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.base64}
                alt={item.productname}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{item.productname}</h3>
              <p className="text-gray-500">Qty: {item.productQuantity}</p>
              <p className="text-sm text-blue-700 font-bold">
                Spent Amount: ₹
                {item.productActualPrice * item.productQuantity}
              </p>
              <p className="text-sm text-green-500 font-bold">
                Generating Revenue: ₹
                {item.productSellingPrice * item.productQuantity}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No non-expiring products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default OurStore;

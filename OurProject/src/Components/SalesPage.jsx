
import React, { useState, useEffect } from "react";

const SalesPage = ({ data }) => {
  console.log(data, "data");

  const [realData, setRealData] = useState(data);

  useEffect(() => {
    if (realData) {
      localStorage.setItem("itemsss", JSON.stringify([realData]));
    }
  }, [realData]);

  console.log(realData, "realDtaa");

  // ✅ Keep baseline initial stock
  const initialQuantity = realData.inpValue || realData.productQuantity;

  // ✅ Current available stock
  const currentQuantity = realData.productQuantity;

  // ✅ Items Sold (never negative, sales won’t reduce on restock)
  const itemsSold = Math.max(initialQuantity - currentQuantity, 0);

  // ✅ Sales = only based on sold items
  const currentSales = itemsSold * realData.productSellingPrice;

  // ✅ Total spent (remaining stock * actual price)
  const totalAmountSpent = currentQuantity * realData.productActualPrice;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Total Spent */}
      <p className="font-bold text-gray-600 text-sm sm:text-base lg:text-lg mt-2 text-center">
        Spent-Amount: <span className="text-black">{totalAmountSpent}</span>
      </p>

      {/* Current Sales */}
      <p className="font-bold text-black text-base sm:text-lg lg:text-xl mt-2 text-center">
        Current-Sales: <span className="text-green-600">{currentSales}</span>
      </p>

      {/* Items Sold */}
      <p className="font-bold text-gray-700 text-sm sm:text-base lg:text-lg mt-2 text-center">
        Items Sold: <span className="text-blue-600">{itemsSold}</span>
      </p>
    </div>
  );
};

export default SalesPage;

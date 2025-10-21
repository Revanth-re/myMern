

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Hero from "../Components/Hero";

// const About = () => {
//   const Navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("All");

//   const data = JSON.parse(localStorage.getItem("userToken"));
//   const userToken = data?.token;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://mymern-e51y.onrender.com/api/getAll",
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );
// console.log(data);

//       const today = new Date();
//       const updated = (Array.isArray(data) ? data : []).map((item) => ({
//         ...item,
//         isExpired: new Date(item.ProductExpiry) < today,
//       }));

//       setAllProducts(updated);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   const handleIncrease = (item, e) => {
//     e.stopPropagation();
//     if (item.isExpired) return;

//     setAllProducts((prev) =>
//       prev.map((p) =>
//         p._id === item._id
//           ? {
//               ...p,
//               productQuantity: p.productQuantity + 1,
//               inpValue: (p.inpValue || 0) + 1,
//             }
//           : p
//       )
//     );

//     axios
//       .put(
//         `https://mymern-e51y.onrender.com/api/update/${item._id}`,
//         {
//           counter: 1,
//           quantity: item.productQuantity + 1,
//           inpValue: (item.inpValue || 0) + 1,
//         },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .catch(() => fetchProducts());
//   };

//   const handleDecrease = (item, e) => {
//     e.stopPropagation();
//     if (item.productQuantity <= 0 || item.isExpired) return;

//     setAllProducts((prev) =>
//       prev.map((p) =>
//         p._id === item._id
//           ? { ...p, productQuantity: p.productQuantity - 1 }
//           : p
//       )
//     );

//     axios
//       .put(
//         `https://mymern-e51y.onrender.com/api/updateDec/${item._id}`,
//         { counter: -1 },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then(() => {
//         axios.post(
//           "https://mymern-e51y.onrender.com/api/printdetails",
//           {
//             pName: item.productname,
//             selling: item.productSellingPrice,
//             quantity: 1,
//           },
//           { headers: { Authorization: `Bearer ${userToken}` } }
//         );
//       })
//       .catch(() => fetchProducts());
//   };

//   const handleDelete = async (item, e) => {
//     e.stopPropagation();
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     setAllProducts((prev) => prev.filter((p) => p._id !== item._id));

//     try {
//       await axios.delete(
//         `https://mymern-e51y.onrender.com/api/delete/${item._id}`
//       );
//     } catch {
//       fetchProducts();
//     }
//   };

//   const handleDetails = (item, e) => {
//     e.stopPropagation();
//     if (!item.isExpired) Navigate(`/MoreDetails/${item._id}`);
//   };

//   // const filteredProducts=allProducts
//   const filteredProducts = allProducts.filter(
//     (p) =>
//       (category === "All" || p.productCategory === category) &&
//       p.productname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Hero />

//       <div className="p-4 mt-5">
//         {/* Search + Category */}
//         <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option value="All">All</option>
//             <option>Biscuits</option>
//             <option>Stationery</option>
//             <option>Cosmetics</option>
//             <option>Snacks & Chips</option>
//             <option>Chocolates</option>
//             <option>Bathroom Essentials</option>
//             <option>Edible Oils</option>
//             <option>Others</option>
//           </select>

//           <input
//             type="text"
//             placeholder="🔍 Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//           />
//         </div>

//         <h1 className="text-2xl font-bold text-center mb-6">
//           Available Products
//         </h1>

//         {/* Product Grid */}
//         <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item) => {
//               // 🟢 Sales Calculations
//               const initialQuantity = Number(item?.inpValue) || 0;
//               const currentQuantity = Number(item?.productQuantity) || 0;
//               const sellingPrice = Number(item?.productSellingPrice) || 0;
//               const actualPrice = Number(item?.productActualPrice) || 0;

//               const itemsSold = Math.max(initialQuantity - currentQuantity, 0);
//               const currentSales = itemsSold * sellingPrice;
//               const totalAmountSpent = initialQuantity * actualPrice;

//               return (
//                 <div
//                   key={item._id}
//                   onClick={(e) => handleDetails(item, e)}
//                   className={`relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
//                     item.isExpired
//                       ? "opacity-50 bg-gray-100 cursor-not-allowed"
//                       : ""
//                   }`}
//                 >
//                   {/* Delete Button */}
//                   <button
//                     onClick={(e) => handleDelete(item, e)}
//                     className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-700"
//                   >
//                     ✕
//                   </button>

//                   {/* Product Image */}
//                   <img
//                     src={
//                       item.base64 ||
//                       "https://via.placeholder.com/150?text=No+Image"
//                     }
//                     alt={item.productname}
//                     className="h-32 sm:h-40 md:h-48 w-full object-cover"
//                   />

//                   {/* Product Info */}
//                   <div className="p-2 sm:p-3 md:p-4">
//                     <h2
//                       className={`font-semibold ${
//                         item.isExpired ? "text-gray-500" : "text-black"
//                       }`}
//                     >
//                       {item.productname}
//                     </h2>
//                     <p className="text-xs text-gray-600">
//                       {item.productCategory}
//                     </p>

//                     {/* Price */}
//                     <div className="mt-2 flex justify-between text-xs">
//                       <span className="text-green-600 font-bold">
//                         Selling: ₹{item.productSellingPrice}
//                       </span>
//                       <span className="text-red-500 font-bold">
//                         MRP: ₹{item.productActualPrice}
//                       </span>
//                     </div>

//                    {/* 🟢 Sales Info Directly */}
// <div className="mt-2 space-y-2">
//   <p className="text-gray-600 text-sm sm:text-base md:text-lg">
//     Spent:{" "}
//     <span className="font-bold text-black text-base sm:text-lg md:text-2xl">
//       ₹{totalAmountSpent}
//     </span>
//   </p>
//   <p className="text-gray-600 text-sm sm:text-base md:text-lg">
//     Sales:{" "}
//     <span className="font-bold text-green-600 text-base sm:text-lg md:text-2xl">
//       ₹{currentSales}
//     </span>
//   </p>
//   <p className="text-gray-600 text-sm sm:text-base md:text-lg">
//     Sold:{" "}
//     <span className="font-bold text-blue-600 text-base sm:text-lg md:text-2xl">
//       {itemsSold}
//     </span>
//   </p>
// </div>

//                     {/* Quantity Controls */}
//                     <div className="flex w-full gap-2 mt-3">
//                       <button
//                         onClick={(e) => handleDecrease(item, e)}
//                         disabled={item.isExpired}
//                         className={`flex-1 py-2 rounded text-sm sm:text-base ${
//                           item.isExpired
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-blue-600 text-white"
//                         }`}
//                       >
//                         -
//                       </button>

//                       <span className="flex-1 flex items-center justify-center font-bold text-lg sm:text-2xl bg-gray-100 rounded">
//                         {item.productQuantity}
//                       </span>

//                       <button
//                         onClick={(e) => handleIncrease(item, e)}
//                         disabled={item.isExpired}
//                         className={`flex-1 py-2 rounded text-sm sm:text-base ${
//                           item.isExpired
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-green-600 text-white"
//                         }`}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No products found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";

const About = () => {
  const Navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true); // 🔹 Loading state

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true); // start loading
    try {
      const { data } = await axios.get(
        "https://mymern-e51y.onrender.com/api/getAll",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const today = new Date();
      const updated = (Array.isArray(data) ? data : []).map((item) => ({
        ...item,
        isExpired: new Date(item.ProductExpiry) < today,
      }));

      setAllProducts(updated);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleIncrease = (item, e) => {
    e.stopPropagation();
    if (item.isExpired) return;

    setAllProducts((prev) =>
      prev.map((p) =>
        p._id === item._id
          ? {
              ...p,
              productQuantity: p.productQuantity + 1,
              inpValue: (p.inpValue || 0) + 1,
            }
          : p
      )
    );

    axios
      .put(
        `https://mymern-e51y.onrender.com/api/update/${item._id}`,
        {
          counter: 1,
          quantity: item.productQuantity + 1,
          inpValue: (item.inpValue || 0) + 1,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch(() => fetchProducts());
  };

  const handleDecrease = (item, e) => {
    e.stopPropagation();
    if (item.productQuantity <= 0 || item.isExpired) return;

    setAllProducts((prev) =>
      prev.map((p) =>
        p._id === item._id
          ? { ...p, productQuantity: p.productQuantity - 1 }
          : p
      )
    );

    axios
      .put(
        `https://mymern-e51y.onrender.com/api/updateDec/${item._id}`,
        { counter: -1 },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        axios.post(
          "https://mymern-e51y.onrender.com/api/printdetails",
          {
            pName: item.productname,
            selling: item.productSellingPrice,
            quantity: 1,
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      })
      .catch(() => fetchProducts());
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this product?")) return;

    setAllProducts((prev) => prev.filter((p) => p._id !== item._id));

    try {
      await axios.delete(
        `https://mymern-e51y.onrender.com/api/delete/${item._id}`
      );
    } catch {
      fetchProducts();
    }
  };

  const handleDetails = (item, e) => {
    e.stopPropagation();
    if (!item.isExpired) Navigate(`/MoreDetails/${item._id}`);
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      (category === "All" || p.productCategory === category) &&
      p.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Hero />

      <div className="p-4 mt-5">
        {/* Search + Category */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="All">All</option>
            <option>Biscuits</option>
            <option>Stationery</option>
            <option>Cosmetics</option>
            <option>Snacks & Chips</option>
            <option>Chocolates</option>
            <option>Bathroom Essentials</option>
            <option>Edible Oils</option>
            <option>Others</option>
          </select>

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Available Products
        </h1>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center text-lg font-medium">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-lg font-medium">No products found</p>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
            {filteredProducts.map((item) => {
              const initialQuantity = Number(item?.inpValue) || 0;
              const currentQuantity = Number(item?.productQuantity) || 0;
              const sellingPrice = Number(item?.productSellingPrice) || 0;
              const actualPrice = Number(item?.productActualPrice) || 0;

              const itemsSold = Math.max(initialQuantity - currentQuantity, 0);
              const currentSales = itemsSold * sellingPrice;
              const totalAmountSpent = initialQuantity * actualPrice;

              return (
                <div
                  key={item._id}
                  onClick={(e) => handleDetails(item, e)}
                  className={`relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                    item.isExpired
                      ? "opacity-50 bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(item, e)}
                    className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-700"
                  >
                    ✕
                  </button>

                  {/* Product Image */}
                  <img
                    src={
                      item.base64 ||
                      "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt={item.productname}
                    className="h-32 sm:h-40 md:h-48 w-full object-cover"
                  />

                  {/* Product Info */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <h2
                      className={`font-semibold ${
                        item.isExpired ? "text-gray-500" : "text-black"
                      }`}
                    >
                      {item.productname}
                    </h2>
                    <p className="text-xs text-gray-600">
                      {item.productCategory}
                    </p>

                    {/* Price */}
                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-green-600 font-bold">
                        Selling: ₹{item.productSellingPrice}
                      </span>
                      <span className="text-red-500 font-bold">
                        MRP: ₹{item.productActualPrice}
                      </span>
                    </div>

                    {/* Sales Info */}
                    <div className="mt-2 space-y-2">
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        Spent:{" "}
                        <span className="font-bold text-black text-base sm:text-lg md:text-2xl">
                          ₹{totalAmountSpent}
                        </span>
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        Sales:{" "}
                        <span className="font-bold text-green-600 text-base sm:text-lg md:text-2xl">
                          ₹{currentSales}
                        </span>
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        Sold:{" "}
                        <span className="font-bold text-blue-600 text-base sm:text-lg md:text-2xl">
                          {itemsSold}
                        </span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex w-full gap-2 mt-3">
                      <button
                        onClick={(e) => handleDecrease(item, e)}
                        disabled={item.isExpired}
                        className={`flex-1 py-2 rounded text-sm sm:text-base ${
                          item.isExpired
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        -
                      </button>

                      <span className="flex-1 flex items-center justify-center font-bold text-lg sm:text-2xl bg-gray-100 rounded">
                        {item.productQuantity}
                      </span>

                      <button
                        onClick={(e) => handleIncrease(item, e)}
                        disabled={item.isExpired}
                        className={`flex-1 py-2 rounded text-sm sm:text-base ${
                          item.isExpired
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;


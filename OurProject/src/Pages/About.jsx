

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BestSellers from "./BestSellers";
// import SalesPage from "../Components/SalesPage";
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
//       const { data } = await axios.get("https://traxxx-5.onrender.com/api/getAll", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       });

//       const today = new Date();
//       const updated = data.map((item) => ({
//         ...item,
//         isExpired: new Date(item.ProductExpiry) < today,
//       }));

//       setAllProducts(updated);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   // ✅ Optimistic Update
//   const handleIncrease = async (item, e) => {
//     e.stopPropagation();

//     setAllProducts((prev) =>
//       prev.map((p) =>
//         p._id === item._id
//           ? { ...p, productQuantity: p.productQuantity + 1 }
//           : p
//       )
//     );

//     try {
//       await axios.put(
//         `https://traxxx-5.onrender.com/api/update/${item._id}`,
//         {
//           counter: 1,
//           quantity: item.productQuantity + 1,
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );
//     } catch (err) {
//       console.error("Error increasing:", err);
//       fetchProducts();
//     }
//   };

//   const handleDecrease = async (item, e) => {
//     e.stopPropagation();
//     if (item.productQuantity <= 0) return;

//     setAllProducts((prev) =>
//       prev.map((p) =>
//         p._id === item._id
//           ? { ...p, productQuantity: p.productQuantity - 1 }
//           : p
//       )
//     );

//     try {
//       await axios.put(
//         `https://traxxx-5.onrender.com/api/updateDec/${item._id}`,
//         { counter: -1 },
//         { headers: { "Content-Type": "application/json" } }
//       );
//     } catch (err) {
//       console.error("Error decreasing:", err);
//       fetchProducts();
//     }
//   };

//   const handleDelete = async (item, e) => {
//     e.stopPropagation();
//     if (confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`https://traxxx-5.onrender.com/api/delete/${item._id}`);
//         setAllProducts((prev) => prev.filter((p) => p._id !== item._id));
//       } catch (err) {
//         console.error("Error deleting:", err);
//       }
//     }
//   };

//   const handleDetails = (item, e) => {
//     e.stopPropagation();
//     Navigate(`/MoreDetails/${item._id}`);
//   };

//   // 🔎 Filter by category & search
//   const filteredProducts = allProducts.filter(
//     (p) =>
//       (category === "All" || p.productCategory === category) &&
//       p.productname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Hero />
//       <div className="mt-30 mb-30">
//         <BestSellers />
//       </div>

//       <div className="p-4">
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
//             filteredProducts.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={(e) => handleDetails(item, e)}
//                 className={`relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
//                   item.isExpired ? "opacity-50 bg-gray-100" : ""
//                 }`}
//               >
//                 {/* ❌ Delete Button (Top Right) */}
//                 <button
//                   onClick={(e) => handleDelete(item, e)}
//                   className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-700"
//                 >
//                   ✕
//                 </button>

//                 {/* Product Image */}
//                 <img
//                   src={item.base64 || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAAVFBMVEXu7u5mZmby8vLMzMxVVVXPz89hYWG9vb2urq5qamra2trW1tb19fVeXl5ZWVne3t5vb2/Dw8N2dnafn59GRkbk5OSmpqaLi4uSkpKEhISZmZm2trYDEOBoAAACB0lEQVR4nO3ZjU6DMBQF4PYyWsrarsCYU9//PS0gs/wYZTHpjTmfyZKxJp7dnbVGhAAAAAAAAAAAAAAAAAAAAAAAAIC/Qk/Jl7cvn9Lnimyr68l7fzroqm22wFKXxVFaZQxsLvZogW2tdL5KmPrw76YzAv/aLwJv9zD2gdcLWAcmcS771ZbAOTAVrVPmtrrINjBRHZyUyleLNWwDxxduzsiYuL2ki9gGjl7UkFeagnPg9Pl9CCxlKPkGpvFnfqL9kNe9inXgjH9LLANT0ybTJOqUc6qtuX7piJrg2vJrfCSa7l6tPwQ+gW1jYmnNOTndaHs486kENX7cFUKxrMD08PUeWEyYhvmGaVOIM15PkMStnq/xCBw/eC0/80plShKLbtPdh8dKHpWgRs15h7NteVSINx+vfe4fPCZMjz5MiUNpky9eN3a7nVrBIjBpleYdzuNHK0jc3XjNyXExh0os+jDPuJjzdv7RlDOxmDCN++868bBXxCnTm0u6fbEMJkzabfMOrSiGVrz49Fo8VUTuCcf9bF9she2T+U4zLm3WwLK2eqcP8zyLbtvtus77nx/tdsNO3LYsymiZLTBVofp2vt8wKrh8E373P8TbfTenjJX4KfAuj8AIvArc5At8PXq7IO8tA7ocvl8w6jPlffauV8bbXgAAAAAAAAAAAAAAAAAAAAAAAP/OB1XfGvtxSX7LAAAAAElFTkSuQmCC"}
//                   alt={item.productname}
//                   className="h-32 sm:h-40 md:h-48 w-full object-cover"
//                 />

//                 {/* Product Info */}
//                 <div className="p-2 sm:p-3 md:p-4">
//                   <h2
//                     className={`font-semibold ${
//                       item.isExpired ? "text-gray-500" : "text-black"
//                     }`}
//                   >
//                     {item.productname}
//                   </h2>
//                   <p className="text-xs text-gray-600">
//                     {item.productCategory}
//                   </p>

//                   {/* Price */}
//                   <div className="mt-2 flex justify-between text-xs">
//                     <span className="text-green-600 font-bold">
//                       Selling: ₹{item.productSellingPrice}
//                     </span>
//                     <span className="text-red-500 font-bold">
//                       MRP: ₹{item.productActualPrice}
//                     </span>
//                   </div>

//                   {/* Sales Info */}
//                   <div>
//                     <SalesPage data={item} />
//                   </div>
                  

//                   {/* Quantity Controls */}
//                  <div className="flex w-full gap-2 mt-3">
//   {/* Decrease */}
//   <button
//     onClick={(e) => handleDecrease(item, e)}
//     className="flex-1 bg-blue-600 text-white py-2 rounded text-sm sm:text-base"
//   >
//     -
//   </button>

//   {/* Quantity */}
//   <span className="flex-1 flex items-center justify-center font-bold text-lg sm:text-2xl bg-gray-100 rounded">
//     {item.productQuantity}
//   </span>

//   {/* Increase */}
//   <button
//     onClick={(e) => handleIncrease(item, e)}
//     className="flex-1 bg-green-600 text-white py-2 rounded text-sm sm:text-base"
//   >
//     +
//   </button>

//   {/* Delete */}

// </div>

//                 </div>
//               </div>
//             ))
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
import BestSellers from "./BestSellers";
import SalesPage from "../Components/SalesPage";
import { useNavigate } from "react-router-dom";
import Hero from "../Components/Hero";

const About = () => {
  const Navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getAll`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      console.log(response,"reponse");
      
      const payload = response?.data;
      const itemsArray = Array.isArray(payload) ? payload : [];

      const today = new Date();
      const updated = itemsArray.map((item) => ({
        ...item,
        isExpired: new Date(item.ProductExpiry) < today,
      }));

      setAllProducts(updated);
    } catch (err) {
      console.error("Error fetching products:", err);
      setAllProducts([]);
    }
  };

  const handleIncrease = async (item, e) => {
    e.stopPropagation();
    if (item.isExpired) return;

    setAllProducts((prev) =>
      prev.map((p) =>
        p._id === item._id
          ? { ...p, productQuantity: p.productQuantity + 1 }
          : p
      )
    );

    try {
      await axios.put(
        `https://traxxx-5.onrender.com/api/update/${item._id}`,
        { counter: 1, quantity: item.productQuantity + 1 },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("Error increasing:", err);
      fetchProducts();
    }
  };

  const handleDecrease = async (item, e) => {
    e.stopPropagation();
    if (item.isExpired || item.productQuantity <= 0) return;

    setAllProducts((prev) =>
      prev.map((p) =>
        p._id === item._id
          ? { ...p, productQuantity: p.productQuantity - 1 }
          : p
      )
    );

    try {
      await axios.put(
        `https://traxxx-5.onrender.com/api/updateDec/${item._id}`,
        { counter: -1 },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("Error decreasing:", err);
      fetchProducts();
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://traxxx-5.onrender.com/api/delete/${item._id}`);
        setAllProducts((prev) => prev.filter((p) => p._id !== item._id));
      } catch (err) {
        console.error("Error deleting:", err);
      }
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
      <div className="mt-30 mb-30">
        <BestSellers />
      </div>

      <div className="p-4">
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
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={(e) => handleDetails(item, e)}
                className={`relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  item.isExpired ? "opacity-50 bg-gray-100 cursor-not-allowed" : ""
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
                  src={item.base64 || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAAVFBMVEXu7u5mZmby8vLMzMxVVVXPz89hYWG9vb2urq5qamra2trW1tb19fVeXl5ZWVne3t5vb2/Dw8N2dnafn59GRkbk5OSmpqaLi4uSkpKEhISZmZm2trYDEOBoAAACB0lEQVR4nO3ZjU6DMBQF4PYyWsrarsCYU9//PS0gs/wYZTHpjTmfyZKxJp7dnbVGhAAAAAAAAAAAAAAAAAAAAAAAAIC/Qk/Jl7cvn9Lnimyr68l7fzroqm22wFKXxVFaZQxsLvZogW2tdL5KmPrw76YzAv/aLwJv9zD2gdcLWAcmcS771ZbAOTAVrVPmtrrINjBRHZyUyleLNWwDxxduzsiYuL2ki9gGjl7UkFeagnPg9Pl9CCxlKPkGpvFnfqL9kNe9inXgjH9LLANT0ybTJOqUc6qtuX7piJrg2vJrfCSa7l6tPwQ+gW1jYmnNOTndaHs486kENX7cFUKxrMD08PUeWEyYhvmGaVOIM15PkMStnq/xCBw/eC0/80plShKLbtPdh8dKHpWgRs15h7NteVSINx+vfe4fPCZMjz5MiUNpky9eN3a7nVrBIjBpleYdzuNHK0jc3XjNyXExh0os+jDPuJjzdv7RlDOxmDCN++868bBXxCnTm0u6fbEMJkzabfMOrSiGVrz49Fo8VUTuCcf9bF9she2T+U4zLm3WwLK2eqcP8zyLbtvtus77nx/tdsNO3LYsymiZLTBVofp2vt8wKrh8E373P8TbfTenjJX4KfAuj8AIvArc5At8PXq7IO8tA7ocvl8w6jPlffauV8bbXgAAAAAAAAAAAAAAAAAAAAAAAP/OB1XfGvtxSX7LAAAAAElFTkSuQmCC"}
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
                  <p className="text-xs text-gray-600">{item.productCategory}</p>

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
                  <div>
                    <SalesPage data={item} />
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex w-full gap-2 mt-3">
                    {/* Decrease */}
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

                    {/* Quantity */}
                    <span className="flex-1 flex items-center justify-center font-bold text-lg sm:text-2xl bg-gray-100 rounded">
                      {item.productQuantity}
                    </span>

                    {/* Increase */}
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
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;

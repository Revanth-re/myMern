

// import React, { useState } from "react";
// import axios from "axios";
// import { useRef } from "react";
// import image from "../assets/noImage.jpg"

// const Hero = () => {
//     const init=null

//   const myref=useRef(init)

 
//   const [HandleProducts, setHandleProducts] = useState({
//     productname: "",
//     productCategory: "",
//     productQuantity: "",
//     productActualPrice: "",
//     productSellingPrice: "",
//     ProductExpiry: "",
//   });
//   const [base64, setBase64Image] = useState(image);
// const [inpValue,setInpvalue]=useState("")

//   const handleForm = async (e) => {
   

//     e.preventDefault();
//    setInpvalue(myref.current.value)
      
//     const FinalData = {...HandleProducts,base64,inpValue };
// const data=JSON.parse(localStorage.getItem("userToken")) 
// console.log(data,"datauser");

// const userToken=data.token
// console.log(userToken,"usertoken");

//     try {
//       const res = await axios.post(
//         "https://traxxx-5.onrender.com/api/products",
//         FinalData,
//           {
//     headers: { Authorization: `Bearer ${userToken}` }
//   }

        

//       );
//       console.log(res);
//       alert("✅ Product saved!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to save product");
//     }
//   };
// console.log(inpValue,"value")


//   return (
//     <div className=" bg-gray-50 mx-auto mt-20 w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]  mx-auto">
//       {/* Product Form */}
//       <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
//         <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
//           📦 Add New Product
//         </h2>

//         <form className="space-y-6" onSubmit={handleForm}>
//           {/* Product Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name
//             </label>
//             <input
//               onChange={(e) =>
//                 setHandleProducts({
//                   ...HandleProducts,
//                   productname: e.target.value,
//                 })
//               }
//               type="text"
//               placeholder="e.g. Parle-G Biscuit"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               onChange={(e) =>
//                 setHandleProducts({
//                   ...HandleProducts,
//                   productCategory: e.target.value,
//                 })
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Choose Category</option>
//               <option>Biscuits</option>
//               <option>Stationery</option>
//               <option>Cosmetics</option>
//               <option>Snacks & Chips</option>
//               <option>Chocolates</option>
//               <option>Bathroom Essentials</option>
//               <option>Edible Oils</option>
//               <option>Others</option>
//             </select>
//           </div>

//           {/* Stock & Price Inputs */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Stock Quantity
//               </label>
//               <input
//          ref={myref}
//                 type="number"
//                 onChange={(e) =>
//                   setHandleProducts({
//                     ...HandleProducts,
//                     productQuantity: e.target.value,
//                   })
                  
//                 }
//                 placeholder="e.g. 25"
//                 min="1"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
                
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Actual Price (₹)
//               </label>
//               <input
//                 type="number"
//                 onChange={(e) =>
//                   setHandleProducts({
//                     ...HandleProducts,
//                     productActualPrice: e.target.value,
//                   })
//                 }
//                 placeholder="e.g. 10"
//                 min="0"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Selling Price (₹)
//               </label>
//               <input
//                 type="number"
//                 onChange={(e) =>
//                   setHandleProducts({
//                     ...HandleProducts,
//                     productSellingPrice: e.target.value,
//                   })
//                 }
//                 placeholder="e.g. 12"
//                 min="0"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Expiry Date
//               </label>
//               <input
//                 type="date"
//                 onChange={(e) =>
//                   setHandleProducts({
//                     ...HandleProducts,
//                     ProductExpiry: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Upload Image */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Product Image
//             </label>
//             <input
//               type="file"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onloadend = () => setBase64Image(reader.result);
//                   reader.readAsDataURL(file);
//                 }
//               }}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
//                 file:border file:rounded-lg file:text-sm file:font-semibold 
//                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>

//           {/* Submit */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
//             >
//               ➕ Add Product
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Dukaan Tracker Features */}
//       {/* <section className="max-w-6xl mx-auto px-4 py-12">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
//           🚀 Dukaan Tracker Features
//         </h2>
//         <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
//           Dukaan Tracker helps small businesses manage stock, track expiry
//           dates, and calculate profits with ease. Stay on top of your sales,
//           avoid losses, and grow your store — all in one app.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <img
//               src="data:image/png;base64,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"
//               alt="Stock Management"
//               className="w-40 h-30 mx-auto mb-4"
//             />
//             <h3 className="font-bold text-lg mb-2">📦 Stock Management</h3>
//             <p className="text-gray-600">
//               Easily add, update, and track your product inventory in real-time.
//             </p>
//           </div>
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <img
//               src="data:image/png;base64,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"
//               alt="Expiry Alerts"
//               className="w-30 h-25 mx-auto mb-4"
//             />
//             <h3 className="font-bold text-lg mb-2">⏳ Expiry Alerts</h3>
//             <p className="text-gray-600">
//               Get notified when products are close to their expiry date.
//             </p>
//           </div>
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <img
//               src="data:image/jpeg;base64,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"
//               alt="Profit Tracking"
//               className="w-30 h-25 mx-auto mb-4"
//             />
//             <h3 className="font-bold text-lg mb-2">💰 Profit Tracking</h3>
//             <p className="text-gray-600">
//               Automatically calculate your total spending and expected revenue.
//             </p>
//           </div>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// export default Hero;
import React, { useState, useRef } from "react";
import axios from "axios";
import image from "../assets/noImage.jpg";

const Hero = () => {
  const myref = useRef(null);

  const [HandleProducts, setHandleProducts] = useState({
    productname: "",
    productCategory: "",
    productQuantity: "",
    productActualPrice: "",
    productSellingPrice: "",
    ProductExpiry: "",
  });

  const [base64, setBase64Image] = useState(image);
  const [inpValue, setInpvalue] = useState("");
  const [showForm, setShowForm] = useState(false); // 👈 toggle state

  const handleForm = async (e) => {
    e.preventDefault();
    setInpvalue(myref.current.value);

    const FinalData = { ...HandleProducts, base64, inpValue };
    const data = JSON.parse(localStorage.getItem("userToken"));
    const userToken = data?.token;

    try {
      const res = await axios.post(
        "https://traxxx-5.onrender.com/api/products",
        FinalData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(res);
      alert("✅ Product saved!");
      setShowForm(false); // hide after submit
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product");
    }
  };

  return (
    <div className="bg-gray-50 mx-auto mt-20 w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">

      {/* Add Item Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          ➕ Add Item
        </button>
      )}

      {/* Product Form */}
      {showForm && (
        <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
            📦 Add New Product
          </h2>

          <form className="space-y-6" onSubmit={handleForm}>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                onChange={(e) =>
                  setHandleProducts({
                    ...HandleProducts,
                    productname: e.target.value,
                  })
                }
                type="text"
                placeholder="e.g. Parle-G Biscuit"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                onChange={(e) =>
                  setHandleProducts({
                    ...HandleProducts,
                    productCategory: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Category</option>
                <option>Biscuits</option>
                <option>Stationery</option>
                <option>Cosmetics</option>
                <option>Snacks & Chips</option>
                <option>Chocolates</option>
                <option>Bathroom Essentials</option>
                <option>Edible Oils</option>
                <option>Others</option>
              </select>
            </div>

            {/* Stock & Price Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  ref={myref}
                  type="number"
                  onChange={(e) =>
                    setHandleProducts({
                      ...HandleProducts,
                      productQuantity: e.target.value,
                    })
                  }
                  placeholder="e.g. 25"
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Price (₹)
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setHandleProducts({
                      ...HandleProducts,
                      productActualPrice: e.target.value,
                    })
                  }
                  placeholder="e.g. 10"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setHandleProducts({
                      ...HandleProducts,
                      productSellingPrice: e.target.value,
                    })
                  }
                  placeholder="e.g. 12"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    setHandleProducts({
                      ...HandleProducts,
                      ProductExpiry: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Upload Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Product Image
              </label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setBase64Image(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                  file:border file:rounded-lg file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Submit + Cancel */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Hero;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddOwnStore = () => {
//   const [storeName, setStoreName] = useState("");
//   const [storeOwner, setStoreOwner] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [products, setProducts] = useState([]);
//   const data=JSON.parse(localStorage.getItem("userToken")) 
// console.log(data,"datauser");
// const Navigate=useNavigate()
// const userToken=data.token
//   // Add product to the list
//   const addProduct = (e) => {
//     e.preventDefault();
//     if (!productName || !productPrice) return;

//     const newProduct = {
//       name: productName,
//       price: productPrice,
//     };

//     setProducts([...products, newProduct]);
//     setProductName("");
//     setProductPrice("");
//   };

//   // Submit store with products
//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//     const storeData = {
//       storeName,
//       storeOwner,
//       products,
//     };
//     const postedData= axios.post("https://traxxx-5.onrender.com/api/poststoredata",storeData,{
//         headers: { Authorization: `Bearer ${userToken}` }
//       })
//       console.log(postedData);
      



//     console.log("Store Data:", storeData);
//     alert("Store added! Check console for data.");

//     // Clear form
//     setStoreName("");
//     setStoreOwner("");
//     setProducts([]);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Add Your Store</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Store Name</label>
//           <input
//             type="text"
//             value={storeName}
//             onChange={(e) => setStoreName(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Owner Name</label>
//           <input
//             type="text"
//             value={storeOwner}
//             onChange={(e) => setStoreOwner(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//           />
//         </div>

//         <hr className="my-4" />
//         <h3 className="text-lg font-semibold mb-2">Add Products</h3>

//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             className="flex-1 border px-3 py-2 rounded-md"
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={productPrice}
//             onChange={(e) => setProductPrice(e.target.value)}
//             className="w-24 border px-3 py-2 rounded-md"
//           />
//           <button
//             onClick={addProduct}
//             className="bg-blue-500 text-white px-3 py-2 rounded-md"
//           >
//             Add
//           </button>
//         </div>

//         {products.length > 0 && (
//           <ul className="mt-2 border rounded-md p-2">
//             {products.map((p, i) => (
//               <li key={i} className="flex justify-between py-1">
//                 <span>{p.name}</span>
//                 <span>₹{p.price}</span>
//               </li>
//             ))}
//           </ul>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-2 rounded-md mt-4"
//         >
//           Save Store
//         </button>
//       </form>

//       <div>

//       </div>
//         <button
//         onClick={()=>Navigate("/yourpostedproducts")}
//           type="submit"
//           className="w-full bg-green-500 text-white py-2 rounded-md mt-4"
//         >
//           Your Products
//         </button>
//     </div>
//   );
// };

// export default AddOwnStore;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddOwnStore = () => {
  const [storeName, setStoreName] = useState("");
  const [storeOwner, setStoreOwner] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [storeExists, setStoreExists] = useState(false); // to check if store exists

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;
  const Navigate = useNavigate();

  // Check if the user already has a store
  useEffect(() => {
    const checkStore = async () => {
      try {
        const res = await axios.get("https://traxxx-5.onrender.com/api/getyourproducts", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (res.data && res.data.length > 0) {
          setStoreExists(true);
          setStoreName(res.data[0].storeName);
          setStoreOwner(res.data[0].OwnerName);
        }
      } catch (err) {
        console.error("Error checking store:", err);
      }
    };
    checkStore();
  }, [userToken]);

  const addProduct = (e) => {
    e.preventDefault();
    if (!productName || !productPrice) return;

    const newProduct = { name: productName, price: productPrice };
    setProducts([...products, newProduct]);
    setProductName("");
    setProductPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeData = {
      storeName,
      storeOwner,
      products,
    };

    try {
      await axios.post("https://traxxx-5.onrender.com/api/poststoredata", storeData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      alert("Store/products added successfully!");
      setProducts([]);
      setStoreExists(true); // store now exists
    } catch (err) {
      console.error(err);
      alert("Error saving store/products");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Your Store / Products</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!storeExists && (
          <>
            <div>
              <label className="block mb-1 font-medium">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Owner Name</label>
              <input
                type="text"
                value={storeOwner}
                onChange={(e) => setStoreOwner(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <hr className="my-4" />
          </>
        )}

        <h3 className="text-lg font-semibold mb-2">Add Products</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="flex-1 border px-3 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-24 border px-3 py-2 rounded-md"
          />
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        {products.length > 0 && (
          <ul className="mt-2 border rounded-md p-2">
            {products.map((p, i) => (
              <li key={i} className="flex justify-between py-1">
                <span>{p.name}</span>
                <span>₹{p.price}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md mt-4"
        >
          Save
        </button>
      </form>

      <button
        onClick={() => Navigate("/yourpostedproducts")}
        className="w-full bg-gray-700 text-white py-2 rounded-md mt-4"
      >
        Your Products
      </button>
    </div>
  );
};

export default AddOwnStore;

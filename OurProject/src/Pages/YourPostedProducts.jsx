
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const YourPostedProducts = () => {
//   const [alldata, setAlldata] = useState([]);
//   const [allbilldata, setallbilldata] = useState([]);
//   const [getbilldata, setbilldata] = useState([]);
//   const [device, setDevice] = useState(null);
//   const [connected, setConnected] = useState(false);

//   const data = JSON.parse(localStorage.getItem("userToken"));
//   const userToken = data?.token;

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://mymern-e51y.onrender.com/api/getyourproducts",
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );
//       setAlldata(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching data:", error);
//     }
//   };

//   const fetchBillData = async () => {
//     try {
//       const response = await axios.get(
//         "https://mymern-e51y.onrender.com/api/getstorebill",
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );
//       setbilldata(response.data);
//       localStorage.setItem("getbillData", JSON.stringify(response.data));
//     } catch (error) {
//       console.error("❌ Error fetching bill data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Inside your React component

// const handleIncrease = async (storeId, prodIndex, prod) => {
//   // 1. Update quantity in UI (state)
//   setAlldata(prev =>
//     prev.map(store =>
//       store._id === storeId
//         ? {
//             ...store,
//             Products: store.Products.map((p, index) =>
//               index === prodIndex
//                 ? { ...p, quantity: (p.quantity || 0) + 1 }
//                 : p
//             )
//           }
//         : store
//     )
//   );

//   // 2. Prepare payload for backend
//   const payload = {
//     storeId,
//     productId: prod._id,
//     name: prod.productName || prod.name,
//     price: prod.productSellingPrice || prod.price,
//     quantity: (prod.quantity || 0) + 1,
//     image: prod.image || "",
//   };

//   try {
//     // 3. Post to backend
//     await axios.post(
//       "https://mymern-e51y.onrender.com/api/poststorebill",
//       payload,
//       { headers: { Authorization: `Bearer ${userToken}` } }
//     );

//     // 4. Refresh bill/cart data
//     fetchBillData();
//   } catch (err) {
//     console.error("❌ Error posting to bill:", err);
//   }
// };



//   // const handleIncrease = (storeId, prodIndex, prod) => {
//   //   setAlldata(prev =>
//   //     prev.map(store =>
//   //       store._id === storeId
//   //         ? {
//   //             ...store,
//   //             Products: store.Products.map((p, index) =>
//   //               index === prodIndex
//   //                 ? { ...p, quantity: (p.quantity || 0) + 1 }
//   //                 : p
//   //             )
//   //           }
//   //         : store
//   //     )
//   //   );

//   //   // post bill data
//   //   setallbilldata(prod);
//   //   axios.put("https://mymern-e51y.onrender.com/api/poststorebill", prod, {
//   //     headers: { Authorization: `Bearer ${userToken}` }
//   //   }).then(() => fetchBillData());

//   // };



//   const handleRemove = async(store, prodIndex) => {
    
//     try {
//           const response=await axios.delete(`https://mymern-e51y.onrender.com/api/removeitemsfromcart`,
//             {
//                   headers: { Authorization: `Bearer ${userToken}` },
//                           data: { store } // 👈 put payload here

//             }

//           )
// console.log(response);
// fetchBillData()

//     } catch (error) {
//       console.log(error);
      
//     }

//   };

//   const connectPrinter = async () => {
//     try {
//       const device = await navigator.bluetooth.requestDevice({
//         acceptAllDevices: true,
//         optionalServices: [0x18f0],
//       });

//       await device.gatt.connect();
//       setDevice(device);
//       setConnected(true);
//       console.log("✅ Connected to:", device.name);
//     } catch (error) {
//       console.error("❌ Error connecting:", error);
//     }
//   };

//   // const printBill = async () => {
//   //   if (!device || !connected) {
//   //     alert("Please connect to a printer first!");
//   //     return;
//   //   }

//   //   try {
//   //     const service = await device.gatt.getPrimaryService(0x18f0);
//   //     const characteristic = await service.getCharacteristic(0x2af1);

//   //     const storeDetails = JSON.parse(localStorage.getItem("storeDetails"));
//   //     let bill = ` -----${storeDetails.owner}------`;
//   //     bill += "------------------------------\n";
//   //     bill += "No Product   Qty  Price  Total\n";
//   //     bill += "--------------------------------\n";

//   //     let grandTotal = 0;

//   //     getbilldata.forEach((item, index) => {
//   //       const productName = (item.name || "").substring(0, 12).padEnd(12, " ");
//   //       const qty = (item.quantity || 1).toString().padStart(-1, " ");
//   //       const price = (item.price || 0).toString().padStart(3, " ");
//   //       const total = ((item.price || 0) * (item.quantity || 1)).toString().padStart(6, " ");
//   //       grandTotal += (item.price || 0) * (item.quantity || 1);

//   //       bill += `${(index + 1).toString()}  ${productName} ${qty} ${price} ${total}\n`;
//   //     });

//   //     bill += "--------------------------------\n";
//   //     bill += `Grand Total: Rs:${grandTotal}\n`;
//   //     bill += "--------------------------------\n";
//   //     bill += "    Thank you for visiting! \n\n\n";

//   //     const encoder = new TextEncoder();
//   //     const data = encoder.encode(bill);

//   //     const cutCommand = new Uint8Array([0x1D, 0x56, 0x00]);
//   //     const chunkSize = 200;

//   //     for (let i = 0; i < data.length; i += chunkSize) {
//   //       const chunk = data.slice(i, i + chunkSize);
//   //       await characteristic.writeValue(chunk);
//   //     }

//   //     await characteristic.writeValue(cutCommand);

//   //     await axios.delete("https://mymern-e51y.onrender.com/api/deletestorebillprint", {
//   //       headers: { Authorization: `Bearer ${userToken}` }
//   //     });

//   //     fetchBillData();
//   //     console.log("🖨️ Bill Printed:\n", bill);
//   //   } catch (error) {
//   //     console.error("❌ Error printing:", error);
//   //   }
//   // };
//   const ESC = '\x1B';
// const GS = '\x1D';

// // Font styles
// const fontNormal = ESC + '!' + '\x00';
// const fontDoubleHeight = ESC + '!' + '\x10';
// const fontDoubleWidth = ESC + '!' + '\x20';
// const fontBold = ESC + 'E' + '\x01';
// const fontBoldOff = ESC + 'E' + '\x00';

// // Alignment
// const alignLeft = ESC + 'a' + '\x00';
// const alignCenter = ESC + 'a' + '\x01';
// const alignRight = ESC + 'a' + '\x02';

//   const printBill = async () => {
//   if (!device || !connected) {
//     alert("Please connect to a printer first!");
//     return;
//   }

//   try {
//     const service = await device.gatt.getPrimaryService(0x18f0);
//     const characteristic = await service.getCharacteristic(0x2af1);

//     const storeDetails = JSON.parse(localStorage.getItem("storeDetails"));
//     let bill = alignCenter + fontBold +fontDoubleHeight+ `-----${storeDetails.owner}-----\n` + fontBoldOff + alignLeft;

//     bill += "------------------------------\n";
//     bill += "No Product   Qty  Price  Total\n";
//     bill += "--------------------------------\n";

//     let grandTotal = 0;

//     getbilldata.forEach((item, index) => {
//       const productName = (item.name || "").substring(0, 12).padEnd(12, " ");
//       const qty = (item.quantity || 1).toString().padStart(-1, " ");
//       const price = (item.price || 0).toString().padStart(3, " ");
//       const total = ((item.price || 0) * (item.quantity || 1)).toString().padStart(6, " ");
//       grandTotal += (item.price || 0) * (item.quantity || 1);

//       bill += `${index + 1}  ${productName} ${qty} ${price} ${total}\n`;
//     });

//     bill += "--------------------------------\n";
//     bill += fontDoubleHeight + fontBold + `Grand Total: Rs:${grandTotal}\n` + fontNormal + fontBoldOff;

//     bill += "--------------------------------\n";
//     bill += "    Thank you for visiting! \n\n\n";

//     const encoder = new TextEncoder();
//     const data = encoder.encode(bill);

//     const cutCommand = new Uint8Array([0x1D, 0x56, 0x00]);
//     const chunkSize = 200;

//     for (let i = 0; i < data.length; i += chunkSize) {
//       const chunk = data.slice(i, i + chunkSize);
//       await characteristic.writeValue(chunk);
//     }
//     await characteristic.writeValue(cutCommand);

//     await axios.delete("https://mymern-e51y.onrender.com/api/deletestorebillprint", {
//       headers: { Authorization: `Bearer ${userToken}` }
//     });

//     fetchBillData();
//     console.log("🖨️ Bill Printed:\n", bill);

//     // ✅ Reset all product quantities to 1
//     setAlldata(prev =>
//       prev.map(store => ({
//         ...store,
//         Products: store.Products.map(prod => ({ ...prod, quantity: 0 }))
//       }))
//     );

//   } catch (error) {
//     console.error("❌ Error printing:", error);
//   }
// };


//   let owner;
//   let stored;

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen mb-20">
//       <h1 className="text-2xl font-bold mb-4">Your Posted Products</h1>

//       {alldata.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         alldata.map(store => (
//           <div key={store._id} className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">{store.storeName}</h2>
//             <p className="text-gray-600 mb-2">Owner: {store.OwnerName}</p>
//             <div className="hidden">
//               {owner = store.OwnerName} {stored = store.storeName}
//             </div>
//             {localStorage.setItem("storeDetails", JSON.stringify({ owner, store }))}

//             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {store.Products.map((prod, index) => (
//     <div
//       key={index}
//       onClick={() => handleIncrease(store._id, index, prod)}
//       className={`relative bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl ${
//         prod.selected ? "bg-blue-50" : "bg-white"
//       }`}
//     >
//       {/* X button in top-right */}
//       <button
//         className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs hover:bg-red-600"
//         onClick={(e) => {
//           e.stopPropagation();
//           handleRemove(prod, index);
//         }}
//       >
//         ✕
//       </button>

//       {/* Product Image */}
//       <img
//         src={prod.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAaVBMVEX///+mpqYAAADY2Nijo6P39/f7+/vy8vKzs7Oqqqrt7e3i4uKwsLC8vLzm5ubIyMjR0dHCwsI8PDx9fX0uLi5sbGyUlJRDQ0NPT08zMzOcnJwcHBwiIiJcXFx2dnZUVFRkZGSHh4cPDw/K/iWGAAAIz0lEQVR4nO1c6bayOgxlLGOZZJbR93/Im7SgoKDoQexa99s/zkEEu5smadJJkv7hfw9iGDbAMMivmUiSbjuqT12tLLUBcOVSX3Vs/SeEiOdT05WBiCxb8hVwibdck/resWIjXkCRjKZZUDgIxvOg6aAJPQ9EB2Qt/i0NDiNm+1CobFkWVT1DXyiV6IanUnhABtK+/X1GRmCWIAQ3VI2Xj6qhCwIrzeDlo3+CTUFnLMv3Nuqx7vkWvkG/Jy6HarImh85bekKcEF7SqPMVSp4JdXaDD2xdD1yQluntTsmmmqVR9dPXVfb6vrT0EKRkvtducxDHBC8W7uhTVTBu92MpXX8FbNH6868MMChoRLCDFyQByJvu4h9QTHuZNGjmHsLSQ3k/mUusin/WLBu6XHNXh2yAsNw/CR7qZQV70RkBmvUX2QegAV/wxA5o6cdVDTV536YbYZiyFn70JgFO9EsBpE6B1QdOhkB/9VltNgGM2n2bFYG6+N9gM8KHdniTFcppd7ObI3hbVuEf7GMrwLbf0g/Q8a+2HYf/lg2+W4dP8U57qKCD3+RyA1jTRt9uW7J5UIKrm7K1qR/UXdn6bk40gWHJ7hYBhF/p79YA/eAG9VUPcAZTgFG9VCuQp3kElxvM19pCD1QoDhDDC1tXN9voflBfNKD+kvU3AK3zzALDjW5jX9hPLdC2jrW8EYH2RBb0g8BrD0CgtKo13gaX8R2Afa0NfpjWwS5qQ9GOpR3Yv9yVra30bfTtoHk/QEqwqFX2zzQKAVq1ZIBgeodTmWDRAI0f+agR4KseO13IeH4znzJAX8rpzGNyhXWEjzGTXR4Zby7Bscp7Vfdl68dzdcS6zzWJeUT2+Ry+bM7l4lmrnc9h8DRrziHQNmU6X4Xu3jkl+mvbQ4Rz/0m0PYelP4VqaVOl8pbc6eEw5ooNDmHtSTL7JxHHMZa+fwrP2TZrOXcKK4EDsM1b5lOdgj+e5lmWJZP60AI+qG3OO3OnzmVpePDavWstvJOfUD/UrM0RzXJpMxq6uZbthXHc439VQVJ2W6V+YOXxrUKmAqTVIuuYxKy4KNltO45yLkOjO/c08K1aAX8dXHpcLqCthJmqNhnusd01L+VXp8q5kurOjLueFdcm5KTiMmbWHJUVJ2VVocLr2Z15DQjOjAbKUyP3tMkEibOaq/uKmiUjKf9cDnfjck7qHOQpPnVxFP5N3hv5CS+CSzr5uRekIIO/dcAzsd2RcigKgZFKi6GRjToZKzGQ8qkCH/qGcFJBQaUyQ+lf39lCaqZGvrYWnQMpkjeEkSKnfGzk5no1kAo9sAQvMyVOKo0MaFPUnNs7jNT5VALSFWqETsbu6eo4PjSfFAIhJKU39SifJrojRaVTI9GLxEkZBVpH3kExTY1aQtqkSYBJULU1INfWitNu5ueuhghIitQ1l1TTjmr4ICkq+YVdNwMpX8GvQ/hLTuwd0vRNbL1sPvCXtzxhPY9BUqDX1GE6FY061XV3OgUVrFK0TUaqi5KuS7o4nehUULivSUFOc71ejzoZKamuGSl6Hvy+Gl9N6kYqvWDrIikn63pEXetSeLHeIAXR53hJSnktmOKk1HPPvE17Zs/pbXx9/kbKK/ERJKUN0gkroNBenIEUa77noaQnl6PFGdoqqcEFnooKfw08t+vZYaLcPPKNFAeQInk7fKjAVTlRlKq25zcoZvBaJmJtHtGTtVEvgNTa8JBfsHqqdc6qaDR5dY66iQayvs/JrgKIZaA+UkwLqDfp2/hcZWh8176vWynPvpGChH0tcNGHpWL22M17QTBbXcIeILcgwDMk47q8TOf3bTVQeVMQz+ZYKc64Je9PSB2Mf6S2YkLqiaIfDHtmfT9P+jgmLuGJ8zwYE+f5pJs5GJNu5kmHLOlsFbB+dUTccenj2mDDlm7ObLw1fGIOSR+vx68HR2UvBnDTDnk9dJESBaNaVemHz/0F+TdKPXysoOGpMkm39YsyhB/VRQHkrEuqlfHrVuFY7Jmnoct6kGeca+xHpCTiVbZbzI6cvC24FqYY84ZTUrTASBURNZ7nqe0Zv0zikVRSew5isfebBnnr4bBWOCz28Iea8f/mWR2Cx0dS3YkqXEMjljk4LAqdklqpv3QXDq8mDnrdQ5QNF0aesBvJGf9CoNvwMO+BlBq5pEonpLxsO6lZ4rCaYgUxlVg2M0SdNkuYMOLjgdYjKa0y4FlyJUVK5b751knNUqzVZLSH37IzltJhiA2tiSX0uS0R1iqPpKIG4x2mGZCr55Dls3afkIow88/qpT5kloyupe3kjCX3EYqxzVlsTlDZ8W4ZGwukAnaZM8JZDSl6mXfenFRu4b6DxaaZq9HKAAe9BIZt8MDahPZSL2ix4dmHu2FhLpA6tY5h62mFFR50qk30rc03p7EyFJQUUVEUUYxKbkN79QpWpIv5XbT8O1JOjm9EUeVeSYGgna2k5kNB9uJ8qRr1fhiGfs+UHDQpxmJsJWV307PzQMqs3BCRtFNS6kZStjWbNFoeXtQuXP3VAp1SGCVskEqLuYXYmLgMpEabaTP+30WDGPxUjpnXJlJ3w4vLA7HVmJXUGTZbFkMeJxltMrzZQFqQYv5OL10C6GRHGYbMPLTNKG+apq4i7hISBpVAooqoF/qQu4HYxSFrJxmJhmzszmxQU5xmfNNvVMnscSisOSEalzajZ0l7XerxZu8yKZYnDpWk/KJ5nB16GLIWcnBfyGkQISeMxJxaE3ISUszpWiEntoVcAiDmYgkhl5WIuQBHyKVKYi7qEnL5m5gLBYVcUinm4lMhl+mKuaBZzKXfQi6SF3M7gZgbL4TcoiLmZh4xtz2JuUFMzK10Ym46FHJ7ppgbWcXc8isJuTlaEnMbuZgb7r9yNIH516MJxDzEQRLyuAtpOBjEF+tgEInLXLAjVKTdDpux9jxsRtrpWJ79s28BDzBCCHjUE0LAQ7EQbxwfZh90fBgvTLiD1nip4h1JNxJ7dXjf8sKfr0O4Yw5nEOlAyH/4Nf4DPIeCpev+T04AAAAASUVORK5CYII="}
//         alt={prod.name || prod.productName}
//         className="w-full h-36 object-cover rounded-lg mb-3"
//       />

//       {/* Product Info */}
//       <h3 className="text-lg font-semibold mb-1">{prod.name || prod.productName}</h3>
//       <p className="text-gray-600 mb-1">Price: ₹{prod.price || prod.productPrice}</p>
//       <p className="text-gray-700 font-medium mb-2">
//         Quantity: <span className="font-bold">{prod.quantity || 1}</span>
//       </p>

//       {/* Add / Increase Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           handleIncrease(store._id, index, prod);
//         }}
//         className="mt-2 px-3 py-1 text-black rounded-lg text-sm  transition"
//       >
//         Click any Where To add
//       </button>
//     </div>
//   ))}
// </div>

//           </div>
//         ))
//       )}

//       <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg mt-20">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Store Items Printer
//         </h2>

//         <div className="mb-4 max-h-64 overflow-y-auto ">
//           <ul className="divide-y divide-gray-200  ">
//             {getbilldata.map((item, index) => (
//               <li key={index} className="py-2 flex justify-between text-gray-700 font-medium">
//                 <span>{item.name}</span>
//                 <span className="text-gray-900 font-semibold">
//                   Qty: {item.quantity || 1} | ₹{item.actualPrice || item.price}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex flex-col gap-3 ">
//           <button
//             onClick={connectPrinter}
//             className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
//               connected
//                 ? "bg-green-500 hover:bg-green-600 text-white"
//                 : "bg-blue-500 hover:bg-blue-600 text-white"
//             }`}
//           >
//             {connected ? "✅ Printer Connected" : "🔗 Connect Printer"}
//           </button>

//           <button
//             onClick={printBill}
//             disabled={!connected}
//             className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
//               connected
//                 ? "bg-indigo-500 hover:bg-indigo-600 text-white"
//                 : "bg-gray-400 text-gray-200 cursor-not-allowed"
//             }`}
//           >
//             🖨️ Print Bill
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourPostedProducts;



import React, { useEffect, useState } from "react";
import axios from "axios";

const YourPostedProducts = () => {
  const [alldata, setAlldata] = useState([]);
  const [getbilldata, setbilldata] = useState([]);
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  // Fetch all products posted by user
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://mymern-e51y.onrender.com/api/getyourproducts",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setAlldata(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  // Fetch store bill data
  const fetchBillData = async () => {
    try {
      const res = await axios.get(
        "https://mymern-e51y.onrender.com/api/getstorebill",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setbilldata(res.data);
      localStorage.setItem("getbillData", JSON.stringify(res.data));
    } catch (err) {
      console.error("❌ Error fetching bill:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBillData();
  }, []);

  // Add/Increase product in bill
const handleIncrease = async (storeId, prodIndex, prod) => {
  // 1. Update state UI
  setAlldata(prev =>
    prev.map(store =>
      store._id === storeId
        ? {
            ...store,
            Products: store.Products.map((p, i) =>
              i === prodIndex ? { ...p, quantity: (p.quantity || 0) + 1 } : p
            )
          }
        : store
    )
  );

  // 2. Send to backend
  console.log(prod,"productssss");
  
  try {
    await axios.post("https://mymern-e51y.onrender.com/api/printstorebill", {
      name:  prod.name,
      price: prod.price,
      quantity:Number(1)
    }, {
      headers: { Authorization: `Bearer ${userToken}` }
    });

    // 3. Refresh bill/cart
    fetchBillData();
  } catch (err) {
    console.error("❌ Error adding to bill:", err.response?.data || err.message);
  }
};

  // Remove single item from bill
  const handleRemove = async (prod) => {
    try {
      await axios.delete(
        "https://mymern-e51y.onrender.com/api/removeitemsfromcart",
        {
          headers: { Authorization: `Bearer ${userToken}` },
          data: {   name: prod.productname, price: prod.productSellingPrice  },
        }
      );
      fetchBillData();
    } catch (err) {
      console.error("❌ Error removing item:", err);
    }
  };

  // Connect to Bluetooth printer
  const connectPrinter = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [0x18f0],
      });
      await device.gatt.connect();
      setDevice(device);
      setConnected(true);
      console.log("✅ Connected to printer:", device.name);
    } catch (err) {
      console.error("❌ Printer connect failed:", err);
    }
  };

  // Print Bill
  const ESC = "\x1B";
  const GS = "\x1D";
  const fontNormal = ESC + "!" + "\x00";
  const fontDoubleHeight = ESC + "!" + "\x10";
  const fontBold = ESC + "E" + "\x01";
  const fontBoldOff = ESC + "E" + "\x00";
  const alignLeft = ESC + "a" + "\x00";
  const alignCenter = ESC + "a" + "\x01";

  const printBill = async () => {
    if (!device || !connected) {
      alert("Please connect to a printer first!");
      return;
    }

    try {
      const service = await device.gatt.getPrimaryService(0x18f0);
      const characteristic = await service.getCharacteristic(0x2af1);

      const storeDetails = JSON.parse(localStorage.getItem("storeDetails"));

      let bill =
        alignCenter +
        fontBold +
        fontDoubleHeight +
        `-----${storeDetails.owner}-----\n` +
        fontBoldOff +
        alignLeft;

      bill += "------------------------------\n";
      bill += "No Product   Qty  Price  Total\n";
      bill += "--------------------------------\n";

      let grandTotal = 0;

      getbilldata.forEach((item, index) => {
        const productName = (item.name || "")
          .substring(0, 12)
          .padEnd(12, " ");
        const qty = (item.quantity || 1).toString().padStart(2, " ");
        const price = (item.price || 0).toString().padStart(4, " ");
        const total = (
          (item.price || 0) * (item.quantity || 1)
        ).toString();
        grandTotal += (item.price || 0) * (item.quantity || 1);

        bill += `${index + 1}  ${productName} ${qty} ${price} ${total}\n`;
      });

      bill += "--------------------------------\n";
      bill +=
        fontDoubleHeight +
        fontBold +
        `Grand Total: Rs:${grandTotal}\n` +
        fontNormal +
        fontBoldOff;
      bill += "--------------------------------\n";
      bill += "    Thank you for visiting! \n\n\n";

      const encoder = new TextEncoder();
      const data = encoder.encode(bill);

      const cutCommand = new Uint8Array([0x1d, 0x56, 0x00]);
      const chunkSize = 200;

      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        await characteristic.writeValue(chunk);
      }
      await characteristic.writeValue(cutCommand);

      // clear bill from DB
      await axios.delete(
        "https://mymern-e51y.onrender.com/api/deletestorebillprint",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchBillData();

      console.log("🖨️ Bill Printed:\n", bill);
    } catch (err) {
      console.error("❌ Error printing:", err);
    }
  };

  let owner, stored;

  return (
    <div className="p-4 bg-gray-100 min-h-screen mb-20">
      <h1 className="text-2xl font-bold mb-4">Your Posted Products</h1>

      {alldata.map((store) => (
        <div key={store._id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{store.storeName}</h2>
          <p className="text-gray-600 mb-2">Owner: {store.OwnerName}</p>

          <div className="hidden">
            {(owner = store.OwnerName)}
            {(stored = store.storeName)}
          </div>
          {localStorage.setItem(
            "storeDetails",
            JSON.stringify({ owner, store: stored })
          )}

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {store.Products.map((prod, index) => (
              <div
                key={index}
                onClick={() => handleIncrease(store._id, index, prod)}
                className="relative bg-white p-4 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl"
              >
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(prod);
                  }}
                >
                  ✕
                </button>

                <img
                  src={prod.image || "https://via.placeholder.com/150"}
                  alt={prod.name || prod.productName}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">
                  {prod.name || prod.productName}
                </h3>
                <p className="text-gray-600 mb-1">
                  Price: ₹{prod.price || prod.productPrice}
                </p>
                <p className="text-gray-700 font-medium">
                  Quantity: {prod.quantity || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg mt-20">
        <h2 className="text-2xl font-bold text-center">Store Items Printer</h2>
        <ul className="divide-y divide-gray-200 my-4 max-h-64 overflow-y-auto">
          {getbilldata.map((item, index) => (
            <li
              key={index}
              className="py-2 flex justify-between text-gray-700 font-medium"
            >
              <span>{item.name}</span>
              <span>
                Qty: {item.quantity} | ₹{item.price}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={connectPrinter}
          className={`w-full px-4 py-2 rounded-lg mb-2 ${
            connected ? "bg-green-500" : "bg-blue-500"
          } text-white`}
        >
          {connected ? "✅ Printer Connected" : "🔗 Connect Printer"}
        </button>
        <button
          onClick={printBill}
          disabled={!connected}
          className={`w-full px-4 py-2 rounded-lg ${
            connected ? "bg-indigo-500" : "bg-gray-400"
          } text-white`}
        >
          🖨️ Print Bill
        </button>
      </div>
    </div>
  );
};

export default YourPostedProducts;

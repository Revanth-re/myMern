
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
//         src={prod.image || "data:image/png;base64,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"}
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
    alert("item addedd")
  } catch (err) {
    console.error("❌ Error adding to bill:", err.response?.data || err.message);
  }
};

  // Remove single item from bill
  
  
  const handleRemove = async (prod) => {
  console.log(prod.name);
  
    try {
      await axios.delete(
        "https://mymern-e51y.onrender.com/api/removeitemsfromcart",
        
        {
          headers: { Authorization: `Bearer ${userToken}` },
data:{prod}
        }
      );
      fetchBillData();
      alert("item removed successfully")
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
                  src={prod.base64 || "data:image/png;base64,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"}
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

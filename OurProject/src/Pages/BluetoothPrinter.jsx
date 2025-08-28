
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const BluetoothPrinter = () => {
// //   const [device, setDevice] = useState(null);
// //   const [connected, setConnected] = useState(false);
// //   const [alldata, setAlldata] = useState([]);
// //    const data = JSON.parse(localStorage.getItem("userToken"));
// //         const userToken = data?.token;
// //   // Fetch data from API
// //    const fetchData = async () => {
// //       try {
     
// //         const response = await axios.get(
// //           "https://traxxx-5.onrender.com/api/getprintdetails",
// //           { headers: { Authorization: `Bearer ${userToken}` } }
// //         );
// //         setAlldata(response.data);
// //       } catch (error) {
// //         console.error("❌ Error fetching data:", error);
// //       }
// //     };
// //   useEffect(() => {
   
// //     fetchData();
// //     connectPrinter()
// //   }, []);

// //   console.log(alldata,"alldataa");
  

// //   // Connect to Bluetooth printer
// //   const connectPrinter = async () => {
// //     try {
// //       const device = await navigator.bluetooth.requestDevice({
// //         acceptAllDevices: true,
// //         optionalServices: [0x18f0], // printer service UUID
// //       });

// //       await device.gatt.connect();
// //       setDevice(device);
// //       setConnected(true);
// //       console.log("✅ Connected to:", device.name);
// //     } catch (error) {
// //       console.error("❌ Error connecting:", error);
// //     }
// //   };



// //   const ESC = '\x1B';
// // const GS = '\x1D';

// // // Font styles
// // const fontNormal = ESC + '!' + '\x00';
// // const fontDoubleHeight = ESC + '!' + '\x10';
// // const fontDoubleWidth = ESC + '!' + '\x20';
// // const fontBold = ESC + 'E' + '\x01';
// // const fontBoldOff = ESC + 'E' + '\x00';

// // // Alignment
// // const alignLeft = ESC + 'a' + '\x00';
// // const alignCenter = ESC + 'a' + '\x01';
// // const alignRight = ESC + 'a' + '\x02';


// //   // Print bill with auto-cut and dynamic spacing
// //   const printBill = async () => {
// //     if (!device || !connected) {
// //       alert("Please connect to a printer first!");
// //       return;
// //     }

// //     try {
// //       const service = await device.gatt.getPrimaryService(0x18f0);
// //       const characteristic = await service.getCharacteristic(0x2af1);

// //       // Build bill content
// //       let bill = "       SuperMarket Bill\n";
// //       bill += "--------------------------------\n";
// //       bill += "No Product   Qty  Price  Total\n";
// //       bill += "--------------------------------\n";

// //       let grandTotal = 0;

// //       alldata.forEach((item, index) => {
// //         // Limit product name to 12 chars for alignment
// //         const productName = (item.productName || "").substring(0, 12).padEnd(12, " ");
// //         const qty = (item.quantity || 1).toString().padStart(-1, " ");
// //         const price = (item.actualPrice || 0).toString().padStart(3, " ");
// //         const total = ((item.actualPrice || 0) * (item.quantity || 1)).toString().padStart(6, " ");
// //         grandTotal += (item.actualPrice || 0) * (item.quantity || 1);

// //         bill += `${(index + 1).toString().padStart(0, " ")}  ${productName} ${qty} ${price} ${total}\n`;
// //       });

// //       bill += "--------------------------------\n";
// //       bill += `Grand Total: Rs:${grandTotal}\n`;
// //       bill += "--------------------------------\n";
// //       bill += "       Thank you for visiting! \n\n\n";

// //       const encoder = new TextEncoder();
// //       const data = encoder.encode(bill);

// //       // Auto-cut command for most ESC/POS printers
// //       const cutCommand = new Uint8Array([0x1D, 0x56, 0x00]);

// //       // Send data in chunks to avoid size limits
// //       const chunkSize = 200;
// //       for (let i = 0; i < data.length; i += chunkSize) {
// //         const chunk = data.slice(i, i + chunkSize);
// //         await characteristic.writeValue(chunk);
// //       }

// //       // Send cut command
// //       await characteristic.writeValue(cutCommand);

// //       const DeletedData=axios.delete("https://traxxx-5.onrender.com/api/deletebillprint",
// //           { headers: { Authorization: `Bearer ${userToken}` } }
// //         )
// // console.log(DeletedData,"deletedData");
// // fetchData()

// //       console.log("🖨️ Bill Printed:\n", bill);
// //     } catch (error) {
// //       console.error("❌ Error printing:", error);
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg mt-20 ">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
// //         Store Items Printer
// //       </h2>

// //       <div className="mb-4 max-h-64 overflow-y-auto">
// //         <ul className="divide-y divide-gray-200">
// //           {alldata.map((item, index) => (
// //             <li key={index} className="py-2 flex justify-between text-gray-700 font-medium">
// //               <span>{item.productName}</span>
// //               <span className="text-gray-900 font-semibold">
// //                 Qty: {item.quantity || 1} | ₹{item.actualPrice}
// //               </span>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       <div className="flex flex-col gap-3">
// //         <button
// //           onClick={connectPrinter}
// //           className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
// //             connected
// //               ? "bg-green-500 hover:bg-green-600 text-white"
// //               : "bg-blue-500 hover:bg-blue-600 text-white"
// //           }`}
// //         >
// //           {connected ? "✅ Printer Connected" : "🔗 Connect Printer"}
// //         </button>

// //         <button
// //           onClick={printBill}
// //           disabled={!connected}
// //           className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
// //             connected
// //               ? "bg-indigo-500 hover:bg-indigo-600 text-white"
// //               : "bg-gray-400 text-gray-200 cursor-not-allowed"
// //           }`}
// //         >
// //           🖨️ Print Bill
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BluetoothPrinter;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BluetoothPrinter = () => {
//   const [device, setDevice] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [alldata, setAlldata] = useState([]);

//   const data = JSON.parse(localStorage.getItem("userToken"));
//   const userToken = data?.token;

//   // ✅ Fetch data from API
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://traxxx-5.onrender.com/api/getprintdetails",
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );
//       setAlldata(response.data || []);
//     } catch (error) {
//       console.error("❌ Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ✅ Connect to Bluetooth printer
//   const connectPrinter = async () => {
//     try {
//       const btDevice = await navigator.bluetooth.requestDevice({
//         acceptAllDevices: true,
//         optionalServices: [0x18f0], // printer service UUID
//       });

//       await btDevice.gatt.connect();
//       setDevice(btDevice);
//       setConnected(true);
//       console.log("✅ Connected to:", btDevice.name);
//     } catch (error) {
//       console.error("❌ Error connecting:", error);
//     }
//   };

//   // ✅ Print bill
// //   const printBill = async () => {
// //     if (!device || !connected) {
// //       alert("Please connect to a printer first!");
// //       return;
// //     }

// //     try {
// //       const service = await device.gatt.getPrimaryService(0x18f0);
// //       const characteristic = await service.getCharacteristic(0x2af1);

// //       // Build bill
// //       let bill = "       SuperMarket Bill\n";
// //       bill += "--------------------------------\n";
// //       bill += "No Product   Qty  Price  Total\n";
// //       bill += "--------------------------------\n";

// //       let grandTotal = 0;

// //       alldata.forEach((item, index) => {
// //         const productName = (item.productName || "")
// //           .substring(0, 12)
// //           .padEnd(12, " ");
// //         const qty = (item.quantity || 1).toString().padStart(3, " ");
// //         const price = (item.actualPrice || 0).toString().padStart(5, " ");
// //         const total = ((item.actualPrice || 0) * (item.quantity || 1))
// //           .toString()
// //           .padStart(6, " ");
// //         grandTotal += (item.actualPrice || 0) * (item.quantity || 1);

// //         bill += `${(index + 1).toString().padEnd(2, " ")} ${productName} ${qty} ${price} ${total}\n`;
// //       });

// //       bill += "--------------------------------\n";
// //       bill += `Grand Total: Rs ${grandTotal}\n`;
// //       bill += "--------------------------------\n";
// //       bill += "       Thank you for visiting! \n\n\n";

// //       const encoder = new TextEncoder();
// //       const data = encoder.encode(bill);

// //       // Send data in chunks (avoid size limit)
// //       const chunkSize = 200;
// //       for (let i = 0; i < data.length; i += chunkSize) {
// //         const chunk = data.slice(i, i + chunkSize);
// //         await characteristic.writeValue(chunk);
// //       }

// //       // Auto cut
// //       const cutCommand = new Uint8Array([0x1D, 0x56, 0x00]);
// //       await characteristic.writeValue(cutCommand);

// //       // Delete printed data
// //       await axios.delete("https://traxxx-5.onrender.com/api/deletebillprint", {
// //         headers: { Authorization: `Bearer ${userToken}` },
// //       });

// //       fetchData();
// //       console.log("🖨️ Bill Printed:\n", bill);
// //     } catch (error) {
// //       console.error("❌ Error printing:", error);
// //     }
// //   };
// //   const handleDelete=async()=>{

// //     axios.delete("https://traxxx-5.onrender.com/api/deletebillitems",{
// //        headers: { Authorization: `Bearer ${userToken}` },
// //     })
// // fetchData()

// //   }

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg mt-20">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//         Store Items Printer
//       </h2>

//       <div className="mb-4 max-h-64 overflow-y-auto">
//         <ul className="divide-y divide-gray-200">

//           <div className={alldata.length>0?"block":"hidden"} >
//                       <button onClick={handleDelete} className="`w-md px-4 py-2 rounded-lg font-semibold shadow-md transition bg-red-500 hover:bg-green-600 text-center" >cancelAllItems</button>

//           </div>
//           {alldata.map((item, index) => (
            
//             <li
//               key={index}
//               className="py-2 flex justify-between text-gray-700 font-medium"
//             >
//               <span>{item.productName}</span>

//               <span className="text-gray-900 font-semibold">

//                 Qty: {item.quantity || 1} | ₹{item.actualPrice}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex flex-col gap-3">
//         <button
//           onClick={connectPrinter}
//           className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
//             connected
//               ? "bg-green-500 hover:bg-green-600 text-white"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           {connected ? "✅ Printer Connected" : "🔗 Connect Printer"}
//         </button>

//         <button
//           onClick={printBill}
//           disabled={!connected}
//           className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
//             connected
//               ? "bg-indigo-500 hover:bg-indigo-600 text-white"
//               : "bg-gray-400 text-gray-200 cursor-not-allowed"
//           }`}
//         >
//           🖨️ Print Bill
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BluetoothPrinter;

import React, { useState, useEffect } from "react";
import axios from "axios";

const BluetoothPrinter = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);
  const [alldata, setAlldata] = useState([]);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  // ✅ Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://traxxx-5.onrender.com/api/getprintdetails",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setAlldata(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Connect to printer
  const connectPrinter = async () => {
    try {
      const btDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [0x18f0], // printer UUID
      });

      await btDevice.gatt.connect();
      setDevice(btDevice);
      setConnected(true);
      console.log("✅ Connected to:", btDevice.name);
    } catch (error) {
      console.error("❌ Error connecting:", error);
    }
  };

  // ESC/POS Commands
  const ESC = "\x1B";
  const GS = "\x1D";

  const alignCenter = ESC + "a" + "\x01";
  const boldOn = ESC + "E" + "\x01";
  const boldOff = ESC + "E" + "\x00";

  // ✅ Print bill
// ✅ Print bill
const printBill = async () => {
  if (!device || !connected) {
    alert("Please connect to a printer first!");
    return;
  }

  try {
    const service = await device.gatt.getPrimaryService(0x18f0);
    const characteristic = await service.getCharacteristic(0x2af1);

    // 🔹 ESC/POS Format Commands
    const ESC = "\x1B";
    const GS = "\x1D";
    const alignCenter = ESC + "a" + "\x01";
    const alignLeft = ESC + "a" + "\x00";
    const boldOn = ESC + "E" + "\x01";
    const boldOff = ESC + "E" + "\x00";
    const doubleHeight = ESC + "!" + "\x10";
    const doubleWidth = ESC + "!" + "\x20";
    const normal = ESC + "!" + "\x00";

    // 🔹 Bill Header
    let bill = "";
    bill += alignCenter + boldOn + doubleHeight + "🛒 SuperMarket Bill 🛒\n" + normal + boldOff;
    bill += "--------------------------------\n";
    bill += alignLeft + boldOn + "No Product     Qty  Price  Total\n" + boldOff;
    bill += "--------------------------------\n";

    // 🔹 Items
    let grandTotal = 0;
    alldata.forEach((item, index) => {
      const productName = (item.productName || "").substring(0, 10).padEnd(10, " ");
      const qty = (item.quantity || 1).toString().padStart(3, " ");
      const price = (item.actualPrice || 0).toString().padStart(5, " ");
      const total = ((item.actualPrice || 0) * (item.quantity || 1)).toString().padStart(6, " ");

      grandTotal += (item.actualPrice || 0) * (item.quantity || 1);

      bill += `${(index + 1).toString().padEnd(2, " ")} ${productName} ${qty} ${price} ${total}\n`;
    });

    bill += "--------------------------------\n";
    bill += boldOn + doubleWidth + `Grand Total: Rs ${grandTotal}\n` + normal + boldOff;
    bill += "--------------------------------\n";
    bill += alignCenter + boldOn + "✨ Thank you for shopping! ✨\n\n\n" + boldOff;

    const encoder = new TextEncoder();
    const data = encoder.encode(bill);

    // 🔹 Send in chunks
    const chunkSize = 200;
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      await characteristic.writeValue(chunk);
    }

    // 🔹 Auto Cut
    const cutCommand = new Uint8Array([0x1D, 0x56, 0x00]);
    await characteristic.writeValue(cutCommand);

    // 🔹 Clear DB after print
    await axios.delete("https://traxxx-5.onrender.com/api/deletebillprint", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    fetchData();
    console.log("🖨️ Bill Printed:\n", bill);
  } catch (error) {
    console.error("❌ Error printing:", error);
  }
};


  // Cancel all items
  const handleDelete = async () => {
    await axios.delete("https://traxxx-5.onrender.com/api/deletebillitems", {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    fetchData();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg mt-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        🖨️ Store Items Printer
      </h2>

      {/* Items list */}
      <div className="mb-4 max-h-64 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {alldata.map((item, index) => (
            <li
              key={index}
              className="py-2 flex justify-between text-gray-700 font-medium"
            >
              <span>{item.productName}</span>
              <span className="text-gray-900 font-semibold">
                Qty: {item.quantity || 1} | ₹{item.actualPrice}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cancel Items Button */}
      {alldata.length > 0 && (
        <button
          onClick={handleDelete}
          className="w-full mb-3 px-4 py-2 rounded-lg font-semibold shadow-md transition bg-red-500 hover:bg-red-600 text-white"
        >
          ❌ Cancel All Items
        </button>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={connectPrinter}
          className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
            connected
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {connected ? "✅ Printer Connected" : "🔗 Connect Printer"}
        </button>

        <button
          onClick={printBill}
          disabled={!connected}
          className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${
            connected
              ? "bg-indigo-500 hover:bg-indigo-600 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          🖨️ Print Bill
        </button>
      </div>
    </div>
  );
};

export default BluetoothPrinter;

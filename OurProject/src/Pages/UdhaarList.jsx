// import React, { useEffect, useState } from 'react'
// import axios from "axios"

// const UdhaarList = () => {
//     const[allData,setAllData]=useState([])
//     const data=JSON.parse(localStorage.getItem("userToken")) 
// console.log(data,"datauser");

// const userToken=data.token
// // try {
//     const FetchData=async()=>{
//         try {
            
       

    
//     const response=await axios.get("https://traxxx-5.onrender.com/api/getkhatas",{
//         headers:{Authorization:`Bearer ${userToken}`}
//     })
//     setAllData(response.data)
//      } catch (error) {
//             console.log(error);
            
//         }
// // }
// // } catch (error) {
    
// }
// useEffect(()=>{
// FetchData()
// },[])
// const DeletePayment=async(item)=>{
//     try {
        
    
// const response=await axios.delete(`https://traxxx-5.onrender.com/api/deletekhata/${item._id}`)
// FetchData()
//     }
// catch (error) {
//        console.log(error)
        
//     }


// }
// const handleClearPayment=async(i)=>{
//     console.log(i._id);
    
//     const money=i.totalMoney

// const response=await axios.put(`https://traxxx-5.onrender.com/api/updatekhata/${i._id}`,{money},  {
//         headers: { "Content-Type": "application/json" }
//       })


// FetchData()
// }
// console.log(allData,"alladata");



//   return (
//      <div className="mt-20 mb-15 px-4 sm:px-8">
//         <h1 className='font-bold mb-5 text-center text-2xl'>Your Khatass</h1>
//   {allData.length > 0 ? (
//     <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//       {allData.map((x, i) => {
//         const remaining = Number(x.totalMoney) - Number(x.moneyGiven);

//         return (
//           <div
//             key={i}
//             className="bg-white border rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
//           >
//             {/* Customer */}
//             <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 truncate">
//               {x.customerName}
//             </h1>
//             <hr />

//             {/* Items */}
//             <h2 className="text-sm sm:text-lg text-gray-700 mb-1 sm:mb-2 truncate">
//               🛒 <span className="font-medium">{x.items}</span>
//             </h2>

//             {/* Money details */}
//             <div className="mt-2 sm:mt-4 space-y-1">
//               <p className="text-gray-600 text-xs sm:text-base">
//                 💰 <span className="font-medium">Total:</span>{" "}
//                 <span className="font-bold text-gray-800">{x.totalMoney}</span>
//               </p>
//               <p className="text-gray-600 text-xs sm:text-base">
//                 ✅ <span className="font-medium">Paid:</span>{" "}
//                 <span className="font-bold text-green-600">{x.moneyGiven}</span>
//               </p>
//               <p className="text-gray-600 text-xs sm:text-base">
//                 🔻 <span className="font-medium">Remaining:</span>{" "}
//                 <span className="font-bold text-red-600">
//                   {remaining > 0 ? remaining : 0}
//                 </span>
//               </p>
//               <p className="text-xs sm:text-base mt-1 sm:mt-2">
//                 📅 <span className="font-medium">Remainder Date:</span>{" "}
//                 <span className="text-indigo-700">{x.remainderDate}</span>
//               </p>
//             </div>
//             <hr />

//             {/* Status + Button */}
//             <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               {remaining <= 0 ? (
//                 <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-green-700 bg-green-100 rounded-full">
//                   ✅ Cleared
//                 </span>
//               ) : (
//                 <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-red-700 bg-red-100 rounded-full">
//                   ⏳ Pending
//                 </span>
//               )}

//               {remaining > 0 && (
//                 <button
//                   onClick={() => handleClearPayment(x)}
//                   className="px-2 sm:px-3 py-1 rounded-lg bg-green-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-green-700 transition"
//                 >
//                   Clear Payment
//                 </button>
//               )}
//             </div>

//             {/* Delete Button */}
//             <button
//               onClick={() => DeletePayment(x)}
//               className="mt-3 sm:mt-5 w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-red-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-red-700 transition"
//             >
//               Delete
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   ) : (
//     <p className="text-center text-gray-500 font-semibold text-xl">
//       😕 No Udhaar records found
//     </p>
//   )}
// </div>


//   )
    
// //   <div className="mt-20 px-4 sm:px-8">
// //     {allData.length > 0 ? (
// //       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //         {allData.map((x, i) => {
// //           const remaining = Number(x.totalMoney) - Number(x.moneyGiven);

// //           return (
// //             <div
// //               key={i}
// //               className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
// //             >
// //               {/* Customer */}
// //               <h1 className="text-2xl font-semibold text-gray-800 mb-3">
// //                 {x.customerName}
// //               </h1>

// //               {/* Items */}
// //               <h2 className="text-lg text-gray-700 mb-2">
// //                 🛒 <span className="font-medium">{x.items}</span>
// //               </h2>

// //               {/* Money details */}
// //               <div className="mt-4 space-y-1">
// //                 <p className="text-gray-600 text-base">
// //                   💰 <span className="font-medium">Total:</span>{" "}
// //                   <span className="font-bold text-gray-800">{x.totalMoney}</span>
// //                 </p>
// //                 <p className="text-gray-600 text-base">
// //                   ✅ <span className="font-medium">Paid:</span>{" "}
// //                   <span className="font-bold text-green-600">{x.moneyGiven}</span>
// //                 </p>
// //                 <p className="text-gray-600 text-base">
// //                   🔻 <span className="font-medium">Remaining:</span>{" "}
// //                   <span className="font-bold text-red-600">
// //                     {remaining > 0 ? remaining : 0}
// //                   </span>
// //                 </p>
// //                 <p className="text-base mt-2">
// //                   📅 <span className="font-medium">Remainder Date:</span>{" "}
// //                   <span className="text-indigo-700">{x.remainderDate}</span>
// //                 </p>
// //               </div>

// //               {/* Status Badge */}
// //               <div className="mt-4">
// //                 {remaining <= 0 ? (
// //                   <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
// //                     ✅ Cleared
// //                   </span>
// //                 ) : (
// //                   <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
// //                     ⏳ Pending
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     ) : (
// //       <p className="text-center text-gray-500 font-semibold text-xl">
// //         😕 No Udhaar records found
// //       </p>
// //     )}
// //   </div>
// // );

// }

// export default UdhaarList

import React, { useEffect, useState } from "react";
import axios from "axios";

const UdhaarList = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc / desc
  const [importantIds, setImportantIds] = useState(() => {
    return JSON.parse(localStorage.getItem("importantUdhaars")) || [];
  });

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const FetchData = async () => {
    try {
      const response = await axios.get("https://traxxx-5.onrender.com/api/getkhatas", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const DeletePayment = async (item) => {
    try {
      await axios.delete(`https://traxxx-5.onrender.com/api/deletekhata/${item._id}`);
      FetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearPayment = async (i) => {
    try {
      const money = i.totalMoney;
      await axios.put(
        `https://traxxx-5.onrender.com/api/updatekhata/${i._id}`,
        { money },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      FetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleImportant = (id) => {
    let updated = [...importantIds];
    if (updated.includes(id)) {
      updated = updated.filter((x) => x !== id);
    } else {
      updated.push(id);
    }
    setImportantIds(updated);
    localStorage.setItem("importantUdhaars", JSON.stringify(updated));
  };

  const getDaysLeft = (date) => {
    const today = new Date();
    const reminderDate = new Date(date);
    const diffTime = reminderDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days left
  };

  // 🔍 Filter by search term
  const filteredData = allData.filter(
    (x) =>
      x.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      x.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 💰 Sort by remaining money
  const sortedData = [...filteredData].sort((a, b) => {
    const remainingA = Number(a.totalMoney) - Number(a.moneyGiven);
    const remainingB = Number(b.totalMoney) - Number(b.moneyGiven);
    return sortOrder === "asc" ? remainingA - remainingB : remainingB - remainingA;
  });

  return (
    <div className="mt-20 mb-15 px-4 sm:px-8">
      <h1 className="font-bold mb-5 text-center text-2xl">Your Khatass</h1>

      {/* 🔍 Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Sort by Money ({sortOrder === "asc" ? "Low → High" : "High → Low"})
        </button>
      </div>

      {sortedData.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((x, i) => {
            const remaining = Number(x.totalMoney) - Number(x.moneyGiven);
            const daysLeft = getDaysLeft(x.remainderDate);
            const isImportant = importantIds.includes(x._id);

            return (
              <div
                key={i}
                className={`border rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-2xl transition transform hover:-translate-y-2 relative ${
                  isImportant ? "border-4 border-yellow-400" : "bg-white"
                }`}
              >
                {/* ⭐ Mark Important */}
                <button
                  onClick={() => toggleImportant(x._id)}
                  className="absolute top-2 right-2 text-yellow-500 text-xl"
                  title="Mark Important"
                >
                  {isImportant ? "⭐" : "☆"}
                </button>

                {/* Customer */}
                <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 truncate">
                  {x.customerName}
                </h1>
                <hr />

                {/* Items */}
                <h2 className="text-sm sm:text-lg text-gray-700 mb-1 sm:mb-2 truncate">
                  🛒 <span className="font-medium">{x.items}</span>
                </h2>

                {/* Money details */}
                <div className="mt-2 sm:mt-4 space-y-1">
                  <p className="text-gray-600 text-xs sm:text-base">
                    💰 <span className="font-medium">Total:</span>{" "}
                    <span className="font-bold text-gray-800">{x.totalMoney}</span>
                  </p>
                  <p className="text-gray-600 text-xs sm:text-base">
                    ✅ <span className="font-medium">Paid:</span>{" "}
                    <span className="font-bold text-green-600">{x.moneyGiven}</span>
                  </p>
                  <p className="text-gray-600 text-xs sm:text-base">
                    🔻 <span className="font-medium">Remaining:</span>{" "}
                    <span className="font-bold text-red-600">
                      {remaining > 0 ? remaining : 0}
                    </span>
                  </p>
                  <p className="text-xs sm:text-base mt-1 sm:mt-2">
                    📅 <span className="font-medium">Reminder Date:</span>{" "}
                    <span className="text-indigo-700">{x.remainderDate}</span>
                  </p>
                  <p className="text-xs sm:text-base">
                    ⏳ <span className="font-medium">Days Left:</span>{" "}
                    <span className="text-purple-700">
                      {daysLeft >= 0 ? `${daysLeft} days` : "Expired"}
                    </span>
                  </p>
                </div>
                <hr />

                {/* Status + Button */}
                <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  {remaining <= 0 ? (
                    <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                      ✅ Cleared
                    </span>
                  ) : (
                    <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                      ⏳ Pending
                    </span>
                  )}

                  {remaining > 0 && (
                    <button
                      onClick={() => handleClearPayment(x)}
                      className="px-2 sm:px-3 py-1 rounded-lg bg-green-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-green-700 transition"
                    >
                      Clear Payment
                    </button>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => DeletePayment(x)}
                  className="mt-3 sm:mt-5 w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-red-600 text-white text-xs sm:text-sm font-semibold shadow hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 font-semibold text-xl">
          😕 No Udhaar records found
        </p>
      )}
    </div>
  );
};

export default UdhaarList;

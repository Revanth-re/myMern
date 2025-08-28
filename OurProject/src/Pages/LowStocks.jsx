// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';

// const LowStocks = () => {
//     const[lowStocks,setLowstocks]=useState([])
//     useEffect(()=>{
// fetchData()
// },[])

//       const data=JSON.parse(localStorage.getItem("userToken")) 
// console.log(data,"datauser");
// const userToken=data.token


   

//   const fetchData = async () => {
//     // try {
//       const response = await axios.get("https://traxxx-5.onrender.com/api/getAll",{
//     headers: { Authorization: `Bearer ${userToken}` }
//    });
//    console.log(response,"response data");
   
//   const spreadData=[]
// response.data.forEach((x)=>{
//   const F_data=x.productQuantity<=10
//   console.log(F_data,"dataaaaff");
  
//   if (F_data===true) {
//     // console.log(F_data,"Fdataaa");
    
   
//     spreadData.push(x)
//     // console.log(spreadData,"spreadData");
    
//      setLowstocks(spreadData)
//   }
  
 
// })

// }
// console.log(lowStocks,"lowStocks");


  





//   return (
//     <div>
//        <h1 className="text-2xl font-bold mb-6">LowStocks Brotherr</h1>
//  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {lowStocks.map((x, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md overflow-hidden border border-black hover:shadow-lg transition"
//           >
//             <img
//               src={x.base64||"data:image/png;base64,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"}
//               alt={x.productname}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold">{x.productname}</h2>
//               {/* <p className="text-gray-500">Expiry Date: {x.ProductExpiry}</p> */}
//               <p className="text-red-500 font-medium">
//                 {/* Days Left: {x.daysLeft} */}
//               </p>
//               <p className="text-gray-600">Quantity Left: {x.productQuantity}</p>

//               <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//                 <p className="text-sm font-medium text-yellow-700">
//                     <p className="text-sm font-medium text-black">Information:</p>
//                   Items are Going Out Of Stock ,Need To Order More Products Broooo...
//                 </p>
//                 {/* <p className="text-sm text-gray-700">{getTips(x.daysLeft)}</p> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default LowStocks
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react"; // nice icon

const LowStocks = () => {
  const [lowStocks, setLowstocks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://traxxx-5.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const filtered = response.data.filter((x) => x.productQuantity <= 10);
      setLowstocks(filtered);
    } catch (error) {
      console.error("Error fetching low stock data:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🚨 Low Stocks</h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

        {lowStocks.map((x, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 "
          >
            {/* ALERT ICON top-right */}
            <div className="absolute top-3 right-3 bg-black p-2 rounded-full shadow">
              <AlertTriangle className="text-red-600 w-10 h-10" />
            </div>

            <img
              src={
                x.base64 ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={x.productname}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {x.productname}
              </h2>
              <p className="text-gray-600">
                Quantity Left:{" "}
                <span className="font-bold text-red-600">
                  {x.productQuantity}
                </span>
              </p>

              {/* Info box */}
              <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded hidden md:block">
                <p className="text-sm font-medium  text-black">
                  ⚠️ Items are going out of stock. Need to order more products!
                </p>
              </div>
               <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded block md:hidden ">
                <p className="text-sm font-medium  text-black">
                 Stock Is Low... <br />
    Order More 
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStocks;

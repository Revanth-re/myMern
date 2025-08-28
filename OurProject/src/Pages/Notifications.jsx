// // import React from 'react'
// // import axios from "axios"

// // import { useState,useEffect } from 'react';
// // const Notifications = () => {
// //     const [allData, setAllData] = useState([]
// //   );
// //     const NotifyData=[]
// //     const fetchData = async () => {

// //       try {
// //         const response = await axios.get("https://traxxx-5.onrender.com/api/getAll");
// //         const today = new Date();
  
// //         const getDaysDiff = (expiry) => {
// //           const expiryDate = new Date(expiry);
// //           return Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
// //         };
  
       
       
  
// //         response.data.forEach((item) => {
          
// //           // console.log(item,"item");
        
// //           const daysLeft = getDaysDiff(item.ProductExpiry);
// //           // console.log(daysLeft,"left");
          
  
// //           if (daysLeft >= 0 && daysLeft <= 7) {
// //             NotifyData.push({...item,daysLeft})
// //           setAllData(NotifyData.slice(NotifyData.length/2))

           
        
          
// //           } 
// //         });
  
     
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
  
// //     useEffect(() => {
// //       fetchData();
// //     }, []);

   
// //     console.log(allData,"data");
    
   
    
    
  
// //   return (
// //     <div className='mt-20'>
// //  {allData.map((x)=>{
// //   return(

// //     <>
// //     <div>
// //       Name:<h1>{x.productname}</h1>
// //       <img src={x.base64} alt="" />
// //       Expiry Product:<h1>{x.ProductExpiry}</h1>
// //       Days-Left:<h1>{x.daysLeft}</h1>
// //       <h1>Quantity-Left:{x.productQuantity}</h1>
// //     </div>
// //     </>
// //   )
// //  })}
// //     </div>
// //   )
// // }

// // export default Notifications

// import React, { useState, useEffect } from "react";
// import axios, { spread } from "axios";
// import LowStocks from "./LowStocks";

// const Notifications = () => {
//   const [allData, setAllData] = useState([]);
//   const[lowStocks,setLowstocks]=useState([])
//   const NotifyData = [];
//   const data=JSON.parse(localStorage.getItem("userToken")) 
// console.log(data,"datauser");
// const userToken=data.token
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("https://traxxx-5.onrender.com/api/getAll",{
//     headers: { Authorization: `Bearer ${userToken}` }
//    });

// console.log(lowStocks,"lowStocks");


  
   
//       const today = new Date();

//       const getDaysDiff = (expiry) => {
//         const expiryDate = new Date(expiry);
//         return Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
//       };

//       response.data.forEach((item) => {
//         const daysLeft = getDaysDiff(item.ProductExpiry);
//         if (daysLeft >= 0 && daysLeft <= 7) {
//           NotifyData.push({ ...item, daysLeft });
//           setAllData(NotifyData.slice(NotifyData.length / 2));
//  localStorage.setItem("NotificationDetails",JSON.stringify(allData))
//         }

//       });
     
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // const filteredAlerts=()=>{
// //   const filteredStocks=response.data.filter((x)=> x.productQuantity<=10)
// // setLowstocks(filteredStocks)
// // }
//   }, []);
 
//   console.log(lowStocks,"stocks low");
  
  

//   const getTips = (daysLeft) => {
//     if (daysLeft <= 2) return "Offer heavy discounts or bundle with popular items.";
//     if (daysLeft <= 5) return "Highlight as 'Fresh Stock – Limited Time Offer'.";
//     return "Promote on social media and give small combo deals.";
//   };

//   return (
//     <div className="mt-20 px-4 mb-20">
//      <LowStocks></LowStocks>
      
//       <h1 className="text-2xl font-bold mb-6">Expiry Alerts (Next 7 Days)</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {allData.map((x, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
//           >
//             <img
//               src={x.base64||"data:image/png;base64,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"}
//               alt={x.productname}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold">{x.productname}</h2>
//               <p className="text-gray-500">Expiry Date: {x.ProductExpiry}</p>
//               <p className="text-red-500 font-medium">
//                 Days Left: {x.daysLeft}
//               </p>
//               <p className="text-gray-600">Quantity Left: {x.productQuantity}</p>

//               <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//                 <p className="text-sm font-medium text-yellow-700">
//                   💡 Tips to Sell:
//                 </p>
//                 <p className="text-sm text-gray-700">{getTips(x.daysLeft)}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notifications;

import React, { useState, useEffect } from "react";
import axios from "axios";
import LowStocks from "./LowStocks";

const Notifications = () => {
  const [allData, setAllData] = useState([]);
  const [lowStocks, setLowStocks] = useState([]);
  const [error, setError] = useState(null);

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://traxxx-5.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const today = new Date();

      // Filter for products expiring within 7 days
      const NotifyData = response.data
        .map((item) => ({
          ...item,
          daysLeft: Math.floor(
            (new Date(item.ProductExpiry) - today) / (1000 * 60 * 60 * 24)
          ),
        }))
        .filter((item) => item.daysLeft >= 0 && item.daysLeft <= 7);

      setAllData(NotifyData);

      // Optional: get low stock items (<=10 quantity)
      const lowStockItems = response.data.filter((item) => item.productQuantity <= 10);
      setLowStocks(lowStockItems);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTips = (daysLeft) => {
    if (daysLeft <= 2) return "Offer heavy discounts or bundle with popular items.";
    if (daysLeft <= 5) return "Highlight as 'Fresh Stock – Limited Time Offer'.";
    return "Promote on social media and give small combo deals.";
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-md border border-red-200">
        <h2 className="text-lg font-bold">Oops! no products Found.</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4 mb-20">
      <LowStocks items={lowStocks} />

      <h1 className="text-2xl font-bold mb-6">Expiry Alerts (Next 7 Days)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allData.length === 0 ? (
          <p className="text-gray-500">No products expiring in the next 7 days.</p>
        ) : (
          allData.map((x, index) => {
            try {
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
                >
                  <img
                    src={
                      x.base64 ||
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAA..."
                    }
                    alt={x.productname}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{x.productname}</h2>
                    <p className="text-gray-500">Expiry Date: {x.ProductExpiry}</p>
                    <p className="text-red-500 font-medium">Days Left: {x.daysLeft}</p>
                    <p className="text-gray-600">Quantity Left: {x.productQuantity}</p>

                    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-sm font-medium text-yellow-700">💡 Tips to Sell:</p>
                      <p className="text-sm text-gray-700">{getTips(x.daysLeft)}</p>
                    </div>
                  </div>
                </div>
              );
            } catch (err) {
              console.error("Error rendering product:", err);
              return (
                <div
                  key={index}
                  className="bg-red-100 p-4 rounded shadow"
                >
                  Failed to render this product.
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;

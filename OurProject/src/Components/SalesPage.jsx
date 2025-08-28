// // import React from 'react'
// // import CurrentSales from './CurrentSales'
// // import { useState } from 'react'
// // import MoreDetails from './MoreDetails'
// // import { useEffect } from 'react'
// // // import OurStore from '../Pages/OurStore'



// // const SalesPage = ({data}) => {
// //   const realData=data
// //   console.log(realData,"realdata");
  


// //   localStorage.setItem("itemsss",JSON.stringify([realData]))
// //   // console.log(realData,"salespage");
  

  
// //   const[showrealData,setShowrealData]=useState(false)
 
// //     // console.log(realData,"realDatarealData");
// // let currentSales=realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice

// //   //  const currentSales =
// //   //     item.inpValue * item.productSellingPrice -
// //   //     newQuantity * item.productSellingPrice;-

// //     console.log(currentSales,"sales");
    
// //   return (
// //     <div>
       
// //       {/* {realData.productQuantity} */}
// //         {realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice<=0?   <p className="font-bold text-xs text-gray-500 sm:text-sm mt-1">
// //           Total-AmountSpent: {realData.productSellingPrice * realData.productQuantity}
// //         </p>: <p className="font-bold text-xs text-gray-500 sm:text-sm mt-1">
// //           Total-AmountSpent: {realData.productSellingPrice * realData.inpValue}
// //         </p>}
// //         <p className="font-bold  text-black-300 text-lg sm:text-sm mt-1">
          
// //                     {/* CurrentSales:{realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice} */}

// //         </p>

// //         CurrentSales:{currentSales}

// // <div className='hidden'>

// //   {/* <OurStore items={realData}></OurStore> */}
// // </div>


// //           {/* {realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice<=0?<>
       
// //        </>:<p  className="font-bold  text-black-300 text-lg sm:text-sm mt-1">

// //   CurrentSales:{realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice || 0}


  
// // </p>} */}
// // <div >
// // {/* <CurrentSales  realDatas={currentSales}></CurrentSales> */}

// // {/* <MoreDetails  salesrealData={realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice}></MoreDetails> */}
// // </div>
// // <div className='hidden'>
// // {/* <OurStore></OurStore> */}
// // </div>
// // {/* {showrealData?<CurrentSales realDatas={realData.inpValue*realData.productSellingPrice-realData.productQuantity*realData.productSellingPrice} ></CurrentSales>:""} */}
// //     </div>
// //   )
// // }

// // export default SalesPage

// // // import React, { createContext, useContext, useState, useEffect } from "react";
// // // import OurStore from "../Pages/OurStore"; // make sure the path is correct

// // // // 1️⃣ Create context
// // // const StoreContext = createContext();

// // // // 2️⃣ Custom hook for child components
// // // export const useStore = () => useContext(StoreContext);

// // // const SalesPage = ({data}) => {
// // //   // const [realData, setRealData] = useState(null);

// // //   // Load initial data from localStorage
// // //   useEffect(() => {
// // //     const dataFromStorage = JSON.parse(localStorage.getItem("itemsss"))?.[0];
// // //     if (dataFromStorage) setRealData(dataFromStorage);
// // //   }, []);

// // //   // if (!realData) return <p>Loading...</p>;

// // //   return (
// // //     <StoreContext.Provider value={{ data }}>
// // //       <div>
// // //         {/* Other sales info */}
// // //         <p className="font-bold text-xs text-gray-500 sm:text-sm mt-1">
// // //           Total-AmountSpent:{" "}
// // //           {data.inpValue * data.productSellingPrice}
// // //         </p>

// // //         <p className="font-bold text-black-300 text-lg sm:text-sm mt-1">
// // //           CurrentSales:{" "}
// // //           {data.inpValue * data.productSellingPrice -
// // //             data.productQuantity * data.productSellingPrice}
// // //         </p>

// // //         {/* Only OurStore gets access to context */}
// // //         <OurStore />
// // //       </div>
// // //     </StoreContext.Provider>
// // //   );
// // // };

// // // export default SalesPage;

// import React, { useState, useEffect } from "react";
// import CurrentSales from "./CurrentSales";
// import MoreDetails from "./MoreDetails";

// const SalesPage = ({ data }) => {
//   const [realData, setRealData] = useState(data);

//   // Save to localStorage whenever data changes
//   useEffect(() => {
//     if (realData) {
//       localStorage.setItem("itemsss", JSON.stringify([realData]));
//     }
//   }, [realData]);

//   // Calculate sales safely
//   const rawSales = 
//     realData.inpValue * realData.productSellingPrice -
//     realData.productQuantity * realData.productSellingPrice;

// let currentSales=rawSales<=0?0: realData.inpValue * realData.productSellingPrice -
//     realData.productQuantity * realData.productSellingPrice;
//   // const currentSales = Math.max(rawSales, 0);
//    // prevent negative values

//   // Total amount spent logic
//   const totalAmountSpent =
//     rawSales <= 0
//       ? realData.productSellingPrice * realData.productQuantity
//       : realData.productSellingPrice * realData.inpValue;

//   return (
//     <div className="p-3">
//       {/* Total Spent */}
//       <p className="font-bold text-xs text-gray-500 sm:text-sm mt-1">
//         Total-AmountSpent: {totalAmountSpent}
//       </p>

//       {/* Current Sales */}
//       <p className="font-bold text-black text-lg sm:text-sm mt-1">
//         CurrentSales: {currentSales}
//       </p>

//       {/* Pass to child components if needed */}
//       {/* <CurrentSales realDatas={currentSales} /> */}
//       {/* <MoreDetails salesrealData={currentSales} /> */}
//     </div>
//   );
// };

// export default SalesPage;

import React, { useState, useEffect } from "react";
import CurrentSales from "./CurrentSales";
import MoreDetails from "./MoreDetails";

const SalesPage = ({ data }) => {
  const [realData, setRealData] = useState(data);
  // const[currSales,setCurrSales]=useState(false)


  
  // Save to localStorage whenever data changes
  useEffect(() => {
    setTimeout(()=>{
setCurrSales(true)
    },4000)
    if (realData) {
      localStorage.setItem("itemsss", JSON.stringify([realData]));
    }
  }, [realData]);

  // Calculate sales safely
  const rawSales =
    realData.inpValue * realData.productSellingPrice -
    realData.productQuantity * realData.productSellingPrice;

  const currentSales = Math.max(rawSales, 0); // prevent negative
  const totalAmountSpent =
    rawSales <= 0
      ? realData.productSellingPrice * realData.productQuantity
      : realData.productSellingPrice * realData.inpValue;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      {/* Total Spent */}
      <p className="font-bold text-gray-600 text-sm sm:text-base lg:text-lg mt-2 text-center">
        Spent-Amount:
        <span className="text-black">{totalAmountSpent}</span>
      </p>

      {/* Current Sales */}
     <p className="font-bold text-black text-base sm:text-lg lg:text-xl mt-2 text-center ">
        Current-Sales:
        <span className="text-green-600">{currentSales}</span>
      </p>
     

      {/* Optional child components */}
      {/* <CurrentSales realDatas={currentSales} /> */}
      {/* <MoreDetails salesrealData={currentSales} /> */}
    </div>
  );
};

export default SalesPage;

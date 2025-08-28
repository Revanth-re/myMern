import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { CalendarIcon, CurrencyRupeeIcon,ArrowsUpDownIcon, ChartBarIcon
   , TagIcon, CurrencyDollarIcon, CubeIcon } from "@heroicons/react/24/outline";
import CurrentSales from "./CurrentSales";

const MoreDetails = ({salesData}) => {
  console.log(salesData,"sales data");
  
  
  // console.log(moreData,"moreData");
  
  
    const[count,setCount]=useState(1)
    const[decreaseCount,setDecrease]=useState(-1)
   


    const increase = async (item) => {
  // update UI instantly
  setProduct((prev) =>
    prev ? { ...prev, productQuantity: prev.productQuantity + 1 } : prev
  );

  try {
    await axios.put(
      `https://traxxx-5.onrender.com/api/update/${item._id}`,
      {
        counter: 1,
        quantity: item.productQuantity + 1,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error updating:", err);
    fetchOne(); // rollback if failed
  }
};

const decrease = async (item) => {
  if (item.productQuantity <= 0) return; // don’t allow below 0

  // update UI instantly
  setProduct((prev) =>
    prev ? { ...prev, productQuantity: prev.productQuantity - 1 } : prev
  );

  try {
    await axios.put(
      `https://traxxx-5.onrender.com/api/updateDec/${item._id}`,
      { counter: -1 },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error decreasing:", err);
    fetchOne(); // rollback if failed
  }
};


// const increase = async (item, e) => {
//   // e.stopPropagation();

//   // Safely calculate new count
  
//   setCount(+1); // Update local state

//   const itemQuant = item.productQuantity;

//   try {
//     const response = await axios.put(
//       `https://traxxx-5.onrender.com/api/update/${item._id}`,
//       {
//         counter: count,
//         quantity: itemQuant+1
//       },
//       {
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//     console.log("Updated successfully:", response.data);
//     fetchOne();
//   } catch (err) {
//     console.error("Error updating:", err);
//   }
// };


    

// //         e.stopPropagation()

  
      
// //     setCount(+1)
// // console.log(count);
// //     // console.log(item);
    
// //     const response =await axios.put(`https://traxxx-5.onrender.com/api/update/${item._id}`, {counter:count}
// //       , { headers: { "Content-Type": "application/json" } }
// //     ).then((res)=>console.log(res) 
// //     ).catch((err)=>console.log(err)
// //     )
// //     console.log(response);
// //     FetchingData()
    
    


//   const decrease=async(item,e)=>{
//     // e.stopPropagation()

//     setDecrease(-1)
// // console.log(count);
//     // console.log(item);
//     console.log(decreaseCount);
    
//     const currValue=item.productQuantity
//     console.log(currValue,"value");
    
    
//     const response =await axios.put(`https://traxxx-5.onrender.com/api/updateDec/${item._id}`, {counter:decreaseCount}
//       , { headers: { "Content-Type": "application/json" } }
//     ).then((res)=>console.log(res)
//     ).catch((err)=>console.log(err)
//     )
//     console.log(response);
//     fetchOne()
    
    

//   }
  const Delete=async(item)=>{
    console.log(item._id);
    const confirmation=confirm("are you sure to delete product")
    if (confirmation) {
       const response =await axios.delete(`https://traxxx-5.onrender.com/api/delete/${item._id}`)
    .then((res)=>  console.log(res)
    
    ).catch((err)=>console.log(err)
    )
    }else{
      alert("you cancleed your delete")
    }
    
    
    console.log(response);
  
    

  }
  const [product, setProduct] = useState(null);
  const { id } = useParams();
 const fetchOne = async () => {
      try {
        const response = await axios.get(`https://traxxx-5.onrender.com/api/MoreDetails/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  useEffect(() => {
   

    fetchOne();
  }, [id]);

  if (!product) return <div></div>;

  return (
    <div className="p-6 mb-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
  <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center sm:text-left">
    {product.productname}
  </h1>
  
  {/* Image */}<div className="flex flex-col sm:flex-row items-center gap-4">
  {/* Image */}
  <img
    src={product.base64}
    alt={product.productname}
    className="w-full sm:w-[50vw]  rounded-md shadow-md object-cover"
    style={{ maxHeight: "400px" }}
  />

  {/* Right section */}
  <div className="flex flex-col items-center sm:items-start  gap-4">
    {/* Buttons + Quantity */}
    <div className="flex items-center gap-2 sm:gap-4">
   <button
  onClick={() => decrease(product)}
  className="bg-blue-600 hover:bg-yellow-700 text-white text-xs sm:text-sm py-2 px-4 sm:py-3 sm:px-6 rounded"
>
  -
</button>

<span className="text-base sm:text-lg lg:text-2xl font-semibold">
  {product.productQuantity}
</span>

<button
  onClick={() => increase(product)}
  className="bg-green-400 hover:bg-yellow-700 text-white text-xs sm:text-sm py-2 px-4 sm:py-3 sm:px-6 rounded"
>
  +
</button>

    </div>

    {/* Price & Quantity info */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center mb-2 sm:text-left border-1 rounded p-10">
      <div className="text-sm sm:text-base lg:text-lg font-semibold text-green-600">
        Selling Price: <span className="font-bold">₹{product.productSellingPrice}</span>
      </div>
      <div className="text-sm sm:text-base lg:text-lg font-semibold text-black">
        Actual Price: <span className="font-bold">₹{product.productActualPrice}</span>
      </div>
      <div className="text-sm sm:text-base lg:text-lg font-semibold text-blue-600">
        Quantity: <span className="font-bold text-lg">{product.productQuantity}</span>
        <p className="font-bold text-2xl text-black ">

                  CurrentSales:{product.inpValue*product.productSellingPrice-product.productQuantity*product.productSellingPrice}

        </p>
      </div>
    </div>
  </div>
</div>




  {/* Category & Expiry */}
 <div className="flex mt-5 flex-col sm:flex-row justify-between items-center mb-6 px-4 py-6  bg-blue-50 border rounded-lg shadow-md gap-4 sm:gap-0 max-w-4xl mx-auto">
      
      {/* Category */}
      <div className="flex items-center gap-3 sm:w-1/2">
        <TagIcon className="w-8 h-8 text-yellow-500" />
        <div>
          <p className="text-lg font-semibold text-gray-700">
            Category: <span className="font-bold">{product.productCategory}</span>
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            The group or type this product belongs to.
          </p>
        </div>
      </div>
      
      {/* Expiry */}
      <div className="flex items-center gap-3 sm:w-1/2 justify-end">
        <CalendarIcon className="w-8 h-8 text-red-500" />
        <div>
          <p className="text-lg font-bold text-black-700 bg-red-100 px-3 py-1 rounded-lg shadow-inner inline-block">
            Expiry: {product.ProductExpiry}
          </p>
          <p className="text-sm text-red-600 mt-1">
            The date after which the product should not be used.
          </p>
        </div>
      </div>
      
    </div>

  {/* Price & Quantity */}
 <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg p-8 shadow-lg grid gap-8  sm:grid-cols-3">

      {/* Selling Price Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
        <TagIcon className="w-12 h-12 text-green-600 mb-4" />
        <p className="text-xl font-bold text-green-700 mb-2">
          Selling Price:
          <span className="font-normal text-black ml-1">Rs {product.productSellingPrice}</span>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          The price at which the product is offered for sale in the market.
        </p>
      </div>

      {/* Actual Price Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
        <CurrencyDollarIcon className="w-12 h-12 text-gray-600 mb-4" />
        <p className="text-xl font-bold text-gray-700 mb-2">
          Actual Price:
          <span className="font-normal text-black ml-1">Rs {product.productActualPrice}</span>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          The original cost or base price before discounts or markups.
        </p>
      </div>

      {/* Quantity Card */}
      <div className="bg-white p-6 rounded-lg shadow-md  flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
        <CubeIcon className="w-12 h-12 text-blue-600 mb-4" />
        <p className="text-xl font-semibold text-blue-700 mb-2">
          Quantity:
          <span className="font-normal text-black ml-1">{product.productQuantity}</span>
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          The total number of products currently in stock.
        </p>
        

      </div>

    </div>


  {/* Description */} <div className="flex flex-col sm:flex-row sm:justify-between gap-6 p-6 bg-gray-100 rounded-md shadow-md max-w-4xl mx-auto">
      
      {/* Total Spent */}
      <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-sm flex-1">
        <CurrencyRupeeIcon className="w-10 h-10 text-blue-600 mb-3" />
        <p className="text-lg font-semibold text-blue-700 mb-1">Total Spent Amount</p>
        <p className="text-2xl font-bold text-black">
          Rs {product.productQuantity * product.productActualPrice}
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center">
          The original cost price of all the products you purchased.
        </p>
      </div>

      {/* Expected Returns */}
      <div className="flex flex-col items-center bg-white p-6 rounded-md shadow-sm flex-1">
        <ArrowsUpDownIcon className="w-10 h-10 text-blue-700 mb-3" />
        <p className="text-lg font-semibold text-blue-700 mb-1">Expected Returns</p>
        <p className="text-2xl font-bold text-black">
          Rs {product.productQuantity * product.productSellingPrice}
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center">
          The total revenue expected from selling all products at the selling price.
        </p>
      </div>

      {/* Expected Profit */}
      <div className=" flex flex-col items-center bg-green-100 p-6 rounded-md shadow-sm flex-1">
        <ChartBarIcon className="w-10 h-10 text-green-600 mb-3" />
        <p className="text-lg font-semibold text-green-700  mb-1">Expected Profit</p>
        <p className="text-2xl font-bold text-black">
          Rs {product.productQuantity * (product.productSellingPrice - product.productActualPrice)}
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center">
          The estimated profit you’ll earn after selling all products.
        </p>
      </div>

    </div>
    {/* <CurrentSales></CurrentSales> */}



</div>

  );
};

export default MoreDetails;

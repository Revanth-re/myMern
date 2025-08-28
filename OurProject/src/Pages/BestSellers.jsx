// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BestSellers = () => {
//   const [AllData, setAllData] = useState([]);
//   const data = JSON.parse(localStorage.getItem("userToken"));
//   const userToken = data?.token;
//   // Fetching data function
//   const FetchingData = async () => {
//     try {
//       const response = await axios.get("https://traxxx-5.onrender.com/api/getAll",{
//         headers: { Authorization: `Bearer ${userToken}` },
//       });
//       // Assuming you want to slice from index 4 onwards
//         console.log("Data fetched:", response.data);
//       setAllData(response.data.slice(0,3));
 
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // useEffect to call FetchingData once on mount
//   useEffect(() => {
//     FetchingData();
//   }, []);

//   console.log(AllData, "hello");

//   return (
//     <div className="px-4">
//         <h1 className="text-2xl font-bold text-center mb-6">


//          BestSellers Of The Month


//         </h1>
        
//       <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
//         {AllData.map((x, idx) => (
//           <div
//             key={idx}
//             className="border-2 p-4 rounded-md flex flex-col items-center bg-yellow-100 shadow-sm"
//           >
//             <h1 className="text-lg font-semibold mb-2 text-center text-black">
//               {x.productname}
//             </h1>
//             <img
//               src={x.base64}
//               alt={x.productname}
//               className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain mb-4"
//               style={{ maxHeight: "30vh" }}
//             />
//             <h1 className="font-bold text-black text-center">
//               Total monthly Sales: Rs-{x.productQuantity * x.productSellingPrice}
//             </h1>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellers;


import React, { useEffect, useState } from "react";
import axios from "axios";

const BestSellers = ({ inp = 10 }) => {
  const [AllData, setAllData] = useState([]);
  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  // Fetching data function
  const FetchingData = async () => {
    try {
      const response = await axios.get("https://traxxx-5.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const payload = response?.data;
      const itemsArray = Array.isArray(payload) ? payload : [];

      // Filter products where productQuantity < inp
      const bestSellers = itemsArray
        .filter((item) => item.productQuantity < inp)
        .slice(0, 4); // take only first 4 bestsellers

      setAllData(bestSellers);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAllData([]);
    }
  };

  // useEffect to call FetchingData once on mount
  useEffect(() => {
    FetchingData();
  }, []);

  console.log(AllData, "Best Sellers");

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Best Sellers Of The Month
      </h1>

      {AllData.length === 0 ? (
        <p className="text-center text-gray-500">No bestseller items found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {AllData.map((x, idx) => (
            <div
              key={idx}
              className="border-2 p-4 rounded-md flex flex-col items-center bg-yellow-100 shadow-sm"
            >
              <h1 className="text-lg font-semibold mb-2 text-center text-black">
                {x.productname}
              </h1>
              <img
                src={x.base64}
                alt={x.productname}
                className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain mb-4"
                style={{ maxHeight: "30vh" }}
              />
              <h1 className="font-bold text-black text-center">
                Total monthly Sales: ₹{x.inpValue * x.productSellingPrice}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellers;

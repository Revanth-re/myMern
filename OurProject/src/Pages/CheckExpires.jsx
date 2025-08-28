// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
//       import ExpiredProducts from "../Components/ExpiredProducts";
// const CheckExpires = () => {
//   const [allData, setAllData] = useState({
//     within7Days: [],
//     within15Days: [],
//     within1Month: [],
//     within2Months: [],
//   });

//   const data=JSON.parse(localStorage.getItem("userToken")) 
// console.log(data,"datauser");
// const userToken=data.token
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("https://traxxx-5.onrender.com/api/getAll",{
//     headers: { Authorization: `Bearer ${userToken}` }
//    });
//    console.log(response.data);
//       const today = new Date();

//       const getDaysDiff = (expiry) => {
//         const expiryDate = new Date(expiry);
//         return Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
//       };

//       const within7Days = [];
//       const within15Days = [];
//       const within1Month = [];
//       const within2Months = [];


//       response.data.forEach((item) => {
//         const daysLeft = getDaysDiff(item.ProductExpiry);

//         if (daysLeft >= 0 && daysLeft <= 7) {
//           within7Days.push({ ...item, daysLeft });
//         } else if (daysLeft > 7 && daysLeft <= 15) {
//           within15Days.push({ ...item, daysLeft });
//         } else if (daysLeft > 15 && daysLeft <= 30) {
//           within1Month.push({ ...item, daysLeft });
//         } else if (daysLeft > 30 && daysLeft <= 60) {
//           within2Months.push({ ...item, daysLeft });
//         }
//       });

//       setAllData({ within7Days, within15Days, within1Month, within2Months });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const ProductGrid = ({ title, products, alert }) => (
//     <div className="mb-8">

//       <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//         {title} {alert && <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />}
//       </h2>
//       {products.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {products.map((product, index) => (
//             <div
//               key={index}
//               className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white hover:shadow-md transition"
//             >
//               <img
//                 src={product.base64}
//                 alt={product.productname}
//                 className="w-24 h-24 object-cover rounded-md mb-3"
//               />
//               <h3 className="font-semibold text-lg text-center">{product.productname}</h3>
//               {/* <p className="text-sm text-gray-600">Sales: {product.totalSales || 0}</p> */}
//               <p className="text-sm font-medium mt-2">
//                 {product.daysLeft} Days Left
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No products in this category.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <div>
//       </div>
     
//       <ProductGrid title="Expiring Within 7 Days" products={allData.within7Days} alert />
//       <ProductGrid title="Expiring Within 15 Days" products={allData.within15Days} />
//       <ProductGrid title="Expiring Within 1 Month" products={allData.within1Month} />
//       <ProductGrid title="Expiring Within 2 Months" products={allData.within2Months} />

//        <ExpiredProducts></ExpiredProducts>

//     </div>
//   );
// };

// export default CheckExpires;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import ExpiredProducts from "../Components/ExpiredProducts";

const CheckExpires = () => {
  const [allData, setAllData] = useState({
    expired: [],
    within7Days: [],
    within15Days: [],
    within1Month: [],
    within2Months: [],
  });

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://traxxx-5.onrender.com/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const today = new Date();

      const getDaysDiff = (expiry) => {
        const expiryDate = new Date(expiry);
        return Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
      };

      const expired = [];
      const within7Days = [];
      const within15Days = [];
      const within1Month = [];
      const within2Months = [];

      response.data.forEach((item) => {
        const daysLeft = getDaysDiff(item.ProductExpiry);

        if (daysLeft < 0) {
          expired.push({ ...item, daysLeft });
        } else if (daysLeft >= 0 && daysLeft <= 7) {
          within7Days.push({ ...item, daysLeft });
        } else if (daysLeft > 7 && daysLeft <= 15) {
          within15Days.push({ ...item, daysLeft });
        } else if (daysLeft > 15 && daysLeft <= 30) {
          within1Month.push({ ...item, daysLeft });
        } else if (daysLeft > 30 && daysLeft <= 60) {
          within2Months.push({ ...item, daysLeft });
        }
      });

      setAllData({ expired, within7Days, within15Days, within1Month, within2Months });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://traxxx-5.onrender.com/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      fetchData(); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const ProductGrid = ({ title, products, alert, expiredSection }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {title} {alert && <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />}
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className={`border rounded-lg shadow-sm p-4 flex flex-col items-center ${
                expiredSection ? "bg-gray-200 text-gray-500" : "bg-white"
              }`}
            >
              <img
                src={product.base64}
                alt={product.productname}
                className="w-24 h-24 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-lg text-center">
                {product.productname}
              </h3>
              <p className="text-sm font-medium mt-2">
                {expiredSection ? "Expired" : `${product.daysLeft} Days Left`}
              </p>

              {expiredSection && (
                <button
                  onClick={() => handleDelete(product._id)}
                  className="mt-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products in this category.</p>
      )}
    </div>
  );

  return (
    <div className="p-6 mb-20">
      <ProductGrid
        title="Expired Products"
        products={allData.expired}
        expiredSection
        alert
      />
      <ProductGrid title="Expiring Within 7 Days" products={allData.within7Days} alert />
      <ProductGrid title="Expiring Within 15 Days" products={allData.within15Days} />
      <ProductGrid title="Expiring Within 1 Month" products={allData.within1Month} />
      <ProductGrid title="Expiring Within 2 Months" products={allData.within2Months} />

      <ExpiredProducts />
    </div>
  );
};

export default CheckExpires;

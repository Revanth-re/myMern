import React, { useState } from 'react'
import axios from 'axios';

const UdhaarCheckForm = () => {

  const [formData, setFormData] = useState({
    customerName: "",
    items: "",
    totalMoney: "",
    moneyGiven: "",
    remainderDate: "",
  });

     const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

     }
  const handleSubmit=async(e)=>{

    e.preventDefault()
    
  const data=JSON.parse(localStorage.getItem("userToken")) 
console.log(data,"datauser");

const userToken=data.token
console.log(userToken,"usertoken");


    try {
      const res = await axios.post(
        "https://traxxx-5.onrender.com/api/addkhatas",
        formData,
          {
    headers: { Authorization: `Bearer ${userToken}` }
  })

  console.log("KhataAddedd");
 setFormData({
    customerName: "",
    items: "",
    totalMoney: "",
    moneyGiven: "",
    remainderDate: "",
  });
  
    }catch(err){

      console.log(err);
      
    }
    
  }

 


    
  
  return (
    <div className='mt-40'>
      

 <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
     <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📝 Add Udhaar Entry
      </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}           <div>
            <label className="block text-gray-700 mb-1">Customer Name</label>
           <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Items */}
          <div>
            <label className="block text-gray-700 mb-1">Items</label>
            <input
              type="text"
              name="items"
              value={formData.items}
              onChange={handleChange}
              required
              placeholder="Eg: Biscuits, Chips"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Total Money */}
          <div>
            <label className="block text-gray-700 mb-1">Total Money</label>
            <input
              type="number"
              name="totalMoney"
              value={formData.totalMoney}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Money Given */}
          <div>
            <label className="block text-gray-700 mb-1">Money Given</label>
            <input
              type="number"
              name="moneyGiven"
              value={formData.moneyGiven}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remainder Date */}
          <div>
            <label className="block text-gray-700 mb-1">Remainder Date</label>
            <input
              type="date"
              name="remainderDate"
              value={formData.remainderDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Save Udhaar
          </button>
        </form>
      
      </div>
    </div>
    </div>
  )
}

export default UdhaarCheckForm

// import React from 'react'
// import { useState } from 'react';

// const UdhaarCheckForm = () => {
// const [formData, setFormData] = useState({
//     customerName: "",
//     items: "",
//     totalMoney: "",
//     moneyGiven: "",
//     remainderDate: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Udhaar Details:", formData);
//     alert("Udhaar entry saved ✅");
//     setFormData({
//       customerName: "",
//       items: "",
//       totalMoney: "",
//       moneyGiven: "",
//       remainderDate: "",
//     });
// // //   };


//   return (
   
   




//  <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
//      <div className="w-full max-w-lg bg-black p-6 rounded-xl shadow-md">      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           📝 Add Udhaar Entry
//       </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Customer Name */}           <div>
//             <label className="block text-gray-700 mb-1">Customer Name</label>
//            <input
//               type="text"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Items */}
//           <div>
//             <label className="block text-gray-700 mb-1">Items</label>
//             <input
//               type="text"
//               name="items"
//               value={formData.items}
//               onChange={handleChange}
//               required
//               placeholder="Eg: Biscuits, Chips"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Total Money */}
//           <div>
//             <label className="block text-gray-700 mb-1">Total Money</label>
//             <input
//               type="number"
//               name="totalMoney"
//               value={formData.totalMoney}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Money Given */}
//           <div>
//             <label className="block text-gray-700 mb-1">Money Given</label>
//             <input
//               type="number"
//               name="moneyGiven"
//               value={formData.moneyGiven}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Remainder Date */}
//           <div>
//             <label className="block text-gray-700 mb-1">Remainder Date</label>
//             <input
//               type="date"
//               name="remainderDate"
//               value={formData.remainderDate}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             Save Udhaar
//           </button>
//         </form>
//         hwlmeojeeojoej
//       </div>
//     </div>
//   )}
// }


// export default UdhaarCheckForm

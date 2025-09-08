
import React, { useState, useRef } from "react";
import axios from "axios";
import image from "../assets/noImage.jpg";

const Hero = () => {
  const myref = useRef(null);

  const [handleProducts, setHandleproducts] = useState({
    productname: "",
    productCategory: "",
    productQuantity: "",
    productActualPrice: "",
    productSellingPrice: "",
    ProductExpiry: "",
    base64:"",
    // inpValue:""
  });

  const [base64, setBase64Image] = useState(image);
  const [inpValue, setInpvalue] = useState("");
  const [showForm, setShowForm] = useState(false); // 👈 toggle state

  const handleForm = async (e) => {
    e.preventDefault();
    // setInpvalue(myref.current.value);

    const FinalData = { ...handleProducts, base64, inpValue };
    const data = JSON.parse(localStorage.getItem("userToken"));
    const userToken = data?.token;

    try {
      const res = await axios.post(
        "https://mymern-e51y.onrender.com/api/addproducts",

        FinalData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(res);

      alert("✅ Product saved!");
      setShowForm(false); // hide after submit
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product");
    }
  };

  return (
    <div className="bg-gray-50 mx-auto mt-20 w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]">

      {/* Add Item Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          ➕ Add Item
        </button>
      )}

      {/* Product Form */}
      {showForm && (
        <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
            📦 Add New Product
          </h2>

          <form className="space-y-6" onSubmit={handleForm}>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                onChange={(e) =>
                  setHandleproducts({
                    ...handleProducts,
                    productname: e.target.value,
                  })
                }
                type="text"
                placeholder="e.g. Parle-G Biscuit"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                onChange={(e) =>
                  setHandleproducts({
                    ...handleProducts,
                    productCategory: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Category</option>
                <option>Biscuits</option>
                <option>Stationery</option>
                <option>Cosmetics</option>
                <option>Snacks & Chips</option>
                <option>Chocolates</option>
                <option>Bathroom Essentials</option>
                <option>Edible Oils</option>
                <option>Others</option>
              </select>
            </div>

     
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  ref={myref}
                  type="number"
                  onChange={(e) =>
                    setHandleproducts({
                      ...handleProducts,
                      productQuantity: e.target.value,
                    })
                  }
                  placeholder="e.g. 25"
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Price (₹)
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setHandleproducts({
                      ...handleProducts,
                      productActualPrice: e.target.value,
                    })
                  }
                  placeholder="e.g. 10"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setHandleproducts({
                      ...handleProducts,
                      productSellingPrice: e.target.value,
                    })
                  }
                  placeholder="e.g. 12"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    setHandleproducts({
                      ...handleProducts,
                      ProductExpiry: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Product Image
              </label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setBase64Image(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                  file:border file:rounded-lg file:text-sm file:font-semibold 
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div> 

            {/* Submit + Cancel */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Hero;
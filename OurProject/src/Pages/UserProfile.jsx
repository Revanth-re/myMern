import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobileNum: "" });
  const Navigate=useNavigate()

  useEffect(() => {
    const dataFromLs = JSON.parse(localStorage.getItem("userToken"));
    if (dataFromLs) {
      setUser(dataFromLs);
      setFormData({
        name: dataFromLs.name || "",
        mobileNum: dataFromLs.mobileNum || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("userToken", JSON.stringify(formData));
    setEditMode(false);
  };
  const handleLogout=()=>{
    const ok=confirm("are you sure to logout")
    if (ok) {
      
    localStorage.removeItem("userToken")
        localStorage.removeItem("storeDetails")

    Navigate("/")
    }else{
      alert("you choosed to stay")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 mt-10">
        <div className="flex flex-col items-center">
          <img
            src="data:image/png;base64,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"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          {!editMode ? (
            <>
              <h2 className="text-xl font-bold mt-4">{user.name}</h2>
              <p className="text-gray-600">{user.mobileNum}</p>
              <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-indigo-600 transition"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-indigo-600 transition">
                Logout
              </button>
            </>
          ) : (
            <div className="mt-4 w-full">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Enter name"
              />
              <input
                type="text"
                name="mobileNum"
                value={formData.mobileNum}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                placeholder="Enter mobile number"
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-gray-500 transition"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Section */}
      <div className="bg-indigo-50 shadow-md rounded-xl w-full max-w-md p-6 mt-6 text-center">
        <h3 className="text-lg font-semibold">Track Endless Items</h3>
        <p className="text-gray-600 mt-2">
          Upgrade to premium to track unlimited items, manage expiry dates, and access all features of DukaanTrack.
        </p>
        <button onClick={()=>Navigate("/payment")} className="mt-4 px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-indigo-700 transition">
          Take Subscription
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

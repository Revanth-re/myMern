
import React from "react";
import { FaStore, FaBoxOpen, FaBell, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Post Tracking",
    description: "Easily track all your inventory items and updates in real-time.",
    icon: <FaClipboardList className="text-indigo-600 text-4xl" />,
  },
  {
    title: "Expiry Alerts",
    description: "Get notified before your stock reaches expiry dates.",
    icon: <FaBell className="text-indigo-600 text-4xl" />,
  },
  {
    title: "Our Store",
    description: "Browse and add products from our trusted marketplace.",
    icon: <FaStore className="text-indigo-600 text-4xl" />,
  },
  {
    title: "My Items",
    description: "Manage your personal items with easy categorization.",
    icon: <FaBoxOpen className="text-indigo-600 text-4xl" />,
  },
];

const LandingPage = () => {
  const Navigate=useNavigate()
  const handleClick=(args)=>{
    console.log("hello world");
    
    if (args.title==="Post Tracking") {
      Navigate("/hero")
      
    }else if(args.title==="Our Store"){
Navigate("/ourstore")
    }
    else if(args.title==="Expiry Alerts"){
Navigate("/Check-Expires")
    }
      else if(args.title==="My Items"){
Navigate("/about")
    }

  }
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-white-600 to-white-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-6">
                Welcome to <span className="text-green-400">DukaanTrack</span>
              </h1>
              <p className="text-lg mb-6">
                Your all-in-one inventory management solution for small retailers.
                Track stock, get expiry alerts, and keep your shop running smoothly.
              </p>
              <button onClick={()=>Navigate("/login")} className="px-6 py-3 bg-blue-600 text-black rounded-lg font-semibold hover:bg-yellow-400 transition bg-gradient-to-r from-green-600 to-blue-600 ">
                Get Started
              </button>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
                alt="Inventory Management"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Your Store
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="mb-4" onClick={()=>handleClick(feature)}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 mb-15 text-center">
        <p>© {new Date().getFullYear()} DukaanTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

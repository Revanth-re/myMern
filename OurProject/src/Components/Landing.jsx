// import React from 'react'
// import Features from './Features'
// // import { Features } from 'tailwindcss'

// // Features
// const Landing = () => {
//   return (
//     <div >
//         <div className="flex items-center justify-between  p-2 bg-success lg:px-8 bg-white-700 ">
//       <img className='w-[20vw]' src="https://media.istockphoto.com/id/1347233834/photo/happy-smiling-groceries-or-kirana-merchant-small-business-owner-counting-money-by-looking-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=hvYRLawatOtr6MXwY3dbZJDGAAox9fYuPOj6xfCaF0s=
// " alt="" />
// <div >
//        <img className='w-[20vw] mb-30' src="https://media.istockphoto.com/id/1347233834/photo/happy-smiling-groceries-or-kirana-merchant-small-business-owner-counting-money-by-looking-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=hvYRLawatOtr6MXwY3dbZJDGAAox9fYuPOj6xfCaF0s=
// " alt="" />
// <img className='aspect border-1 rounded ' src="data:image/png;base64,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" alt="" />
//     <p ></p>
    
//      <img className='w-[20vw] mt-30' src="https://media.istockphoto.com/id/1347233834/photo/happy-smiling-groceries-or-kirana-merchant-small-business-owner-counting-money-by-looking-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=hvYRLawatOtr6MXwY3dbZJDGAAox9fYuPOj6xfCaF0s=
// " alt="" />

// </div>
//        <img className='w-[20vw]' src="https://media.istockphoto.com/id/1347233834/photo/happy-smiling-groceries-or-kirana-merchant-small-business-owner-counting-money-by-looking-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=hvYRLawatOtr6MXwY3dbZJDGAAox9fYuPOj6xfCaF0s=
// " alt="" />
  
// <div>
//     </div>

//     </div>    
//           <Features/>

//     </div>
//   )
// }

// export default Landing
// src/pages/LandingPage.jsx
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
              <button className="px-6 py-3 bg-blue-600 text-black rounded-lg font-semibold hover:bg-yellow-400 transition bg-gradient-to-r from-green-600 to-blue-600 ">
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

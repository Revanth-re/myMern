// import React from "react";
// import axios from "axios";

// const PaymentComponent = () => {
//     const handlePayment = async () => {
//         try {
//             // 1️⃣ Create order from backend
//             const  data  = await axios.post("https://traxxx-5.onrender.com/api/create-order", {
//                 amount: 50000 // amount in INR
//             });
//             console.log(data,"data");
            

//             // 2️⃣ Open Razorpay payment window
//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from Razorpay dashboard
//                 amount: data.amount,
//                 currency: data.currency,
//                 name: "Test Payment",
//                 description: "Paying for order",
//                 order_id: data.id,
//                 handler: function (response) {
//                     alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//                 },
//                 prefill: {
//                     name: "John Doe",
//                     email: "johndoe@example.com",
//                     contact: "9999999999"
//                 },
//                 theme: {
//                     color: "#3399cc"
//                 }
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="mb-20" style={{ padding: "20px"  }}>
//             <h2>Pay with Razorpay</h2>
//             <button onClick={handlePayment} style={{ padding: "10px 20px", background: "blue", color: "white" }}>
//                 Pay ₹500
//             </button>
//         </div>
//     );
// };

// export default PaymentComponent;

import React from "react";
import axios from "axios";

const PaymentComponent = () => {

    const handlePayment = async (planName, amountInRupees) => {
        try {
            // Convert rupees to paise
            const amountInPaise = amountInRupees;

            // 1️⃣ Create order from backend
            const { data } = await axios.post("https://traxxx-5.onrender.com/api/create-order", {
                amount: amountInPaise
            });

            // 2️⃣ Open Razorpay payment window
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "DukaanTrack Premium",
                description: `Subscription Plan: ${planName}`,
                order_id: data.id,
                handler: function (response) {
                    alert(`✅ Payment successful for ${planName}!\nPayment ID: ${response.razorpay_payment_id}`);
                    localStorage.setItem("paymentDetails",JSON.stringify({paymentId:response.razorpay_payment_id,planName:planName}))
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999"
                },
                theme: { color: "#4F46E5" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
        }
    };

    const subscribed=JSON.parse(localStorage.getItem("paymentDetails"))
    console.log(subscribed.paymentId);
    
    return (
        <div className="bg-gray-50 min-h-screen p-6">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-indigo-600">DukaanTrack Premium</h1>
                <p className="text-gray-600 mt-2">Unlock full power of your shop management with our premium plans</p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
                {[
                    { title: "Unlimited Inventory", desc: "Manage unlimited products and stock without restrictions" },
                    { title: "Low Stock Alerts", desc: "Get instant notifications before items run out" },
                    { title: "Discount & Offers", desc: "Easily create offers and attract more customers" },
                    { title: "Multi-Device Sync", desc: "Access your store data anywhere, anytime" },
                    { title: "Advanced Reports", desc: "Track sales & profits with detailed analytics" },
                    { title: "Priority Support", desc: "Get dedicated 24/7 premium customer support" }
                ].map((f, i) => (
                    <div key={i} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold text-indigo-600">{f.title}</h3>
                        <p className="text-gray-600 mt-2">{f.desc}</p>
                    </div>
                ))}
            </div>

            {/* Subscription Plans */}

            {!subscribed?<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                    { name: "Monthly", price: 19 },
                    { name: "3 Months", price: 49 },
                    { name: "Yearly", price: 179 }
                ].map((plan, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-md text-center p-8 hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold text-indigo-600">{plan.name}</h2>
                        <p className="text-3xl font-extrabold mt-4">₹{plan.price}</p>
                        <p className="text-gray-500 mb-6">Access all premium features</p>
                        <button
                            onClick={() => handlePayment(plan.name, plan.price)}
                            className="bg-green-400 text-black px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Subscribe Now
                        </button>
                    </div>
                ))}
            </div>:<div>

                <h1 className="text-center font-bold">
                    You Took {subscribed.planName}  plan Enjoy Your Services 


                </h1>




                
                
                </div>}
            
        </div>
    );
};

export default PaymentComponent;

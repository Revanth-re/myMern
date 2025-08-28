// import React from 'react'
// import { useState } from 'react'
// import axios from "axios"
// import {useNavigate,Link} from "react-router-dom"
// const Signup = (e) => {
//   const Navigate=useNavigate()
    

//     const [signupDetails,setSignupDetails]=useState({name:"",
//         password:"",
//         number:""

//     })
//     const handleSignup=async(e)=>{
//         e.preventDefault()
//         try {
//             const response=await axios.post("https://traxxx-5.onrender.com//api/signup",signupDetails,  { headers: { "Content-Type": "application/json" }})

//             console.log("postedddd");
//             console.log(response);
//             Navigate("/Login")
            
            

//         } catch (error) {
//             console.log(error);
            
//         }
        
//     }
//   return (
//     <div>
//         <form action="" className='bg-blue-500' onSubmit={handleSignup}>
//       <input type="text" onChange={(e)=>setSignupDetails({...signupDetails,name:e.target.value})} placeholder='name' /> <br />
//       <input type="password" onChange={(e)=>setSignupDetails({...signupDetails,password:e.target.value})}   placeholder='password'/> <br />
//         <input onChange={(e)=>setSignupDetails({...signupDetails,number:e.target.value})} type="number"  placeholder='mobilenum' /> 
//         <button className='bg-red-500' type='submit'>submit</button>
//         <Link to="/Login">already-Registered</Link>
//       </form>

//     </div>
//   )
// }

// export default Signup

import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import config from "../config";

const Signup = () => {
    const navigate = useNavigate();
    const [signupDetails, setSignupDetails] = useState({
        name: "",
        password: "",
        number: ""
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://traxxx-5.onrender.com/api/signup`, signupDetails, {
                headers: { "Content-Type": "application/json" }
            });
            navigate("/Login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSignup}
                className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setSignupDetails({ ...signupDetails, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setSignupDetails({ ...signupDetails, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="number"
                    placeholder="Mobile Number"
                    onChange={(e) => setSignupDetails({ ...signupDetails, number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    Submit
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already registered?{" "}
                    <Link to="/Login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import config from '../config'
const Features = () => {
  const [AllData,setAllData]=useState([])
    const navigate=useNavigate()
    const handleItems=()=>{
     
     axios.get(`${config.API_BASE_URL}/api/getAll`) 
.then((response) => {
  console.log(response.data);
  
   setAllData(response.data)
      navigate("/home")
  })
 
    }
console.log(AllData);


  return (
    <div>
      
      <div className='flex items-center mt-20 m-3 gap-3' >
        <div className='border-3 p-10'>
        <p>Lorem ipsum dolor sit.</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, fugiat.
         <br /><button onClick={handleItems} className='bg-red-300 border-2 rounded p-1'>start-Tracking</button>

        </div>
         <div  className='border-3 p-10'>
        <p>Lorem ipsum dolor sit.</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, fugiat.
         <br /><button  className='bg-red-300 border-2 rounded p-1'>Your-Items</button>

        </div>
           <div  className='border-3 p-10'>
        <p>Lorem ipsum dolor sit.</p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, fugiat.
         <br /><button  className='bg-red-300 border-2 rounded p-1'>Check Expires</button>

        </div>
           <div  className='border-3 p-10'>
        <p>Lorem ipsum dolor sit.</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, fugiat.
         <br /><button  className='bg-red-300 border-2 rounded p-1'>Your-Store</button>

        </div>

      </div>
    </div>
  )
}

export default Features

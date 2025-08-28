// 
import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Home from './Pages/Home'
import { Route,Routes } from 'react-router-dom'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Landing from './Components/Landing'
import Features from './Components/Features'
import MoreDetails from './Components/MoreDetails'
import axios from "axios"
import CheckExpires from './Pages/CheckExpires'
import OurStore from './Pages/OurStore'
import Profile from './Pages/Profile'
import Notifications from './Pages/Notifications'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import PaymentComponent from './Pages/PaymentComponent'
import UdhaarForm from './Pages/UdhaarForm'
import UdhaarCheckForm from './Pages/UdhaarCheckForm'
import UdhaarList from './Pages/UdhaarList'
import BluetoothPrinter from './Pages/BluetoothPrinter'
import PrinterDiscovery from './Pages/PrinterDiscovery'
import AddPersnolStore from './Pages/AddPersnolStore'
import AddOwnStore from './Pages/AddOwnStore'
import YourPostedProducts from './Pages/YourPostedProducts'
// import ExpiredProducts from './Components/ExpiredProducts'

// YourPostedProducts




const App = () => {
  // const[AllData,setAllData]=useState([])


//   const FetchingData=async()=>{
//    axios.get("http://localhost:5000/api/getAll").then((response) => {
//       console.log();

//       setAllData(response.data);
//     });
// }
// FetchingData()
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
           <Route path="/about" element={<About/>}></Route>
           {/* <Route path='/products/:id' element={<MoreDetails ProductsData={AllData}/>}></Route> */}
              <Route path="/contact" element={<Contact/>}></Route>
<Route path='/hero' element={<Hero/>}></Route>
<Route path='/' element={<Landing/>}></Route>
<Route path='/MoreDetails/:id' element={<MoreDetails/>}></Route>
<Route path='/Check-Expires' element={<CheckExpires/>}></Route>
<Route path='/ourstore' element={<OurStore/>}></Route>
<Route path='/notifications' element={<Notifications/>}></Route>
<Route path='/profile' element={<Profile/>}></Route>
<Route path='/signup' element={<Signup/>}></Route>
<Route path='/Login' element={<Login/>}></Route>
<Route path='/payment' element={<PaymentComponent/>}></Route>

<Route path='/UdhaarForm' element={<UdhaarForm/>}></Route>
<Route path='/udhaarcheckform' element={<UdhaarCheckForm/>}></Route>
<Route path='/udhaarlist' element={<UdhaarList/>}></Route>
<Route path='/bluetoothprinter' element={<BluetoothPrinter/>}></Route>
<Route path='/printerdiscovery' element={<PrinterDiscovery/>}></Route>
<Route path='/addstore' element={<AddPersnolStore/>}></Route>
<Route path='/addownstore' element={<AddOwnStore/>}></Route>
<Route path='/yourpostedproducts' element={<YourPostedProducts/>}></Route>





{/* <Route path='/' element={<Features/>}></Route> */}



      </Routes>

      {/* <Hero></Hero> */}
    
     {/* <ExpiredProducts></ExpiredProducts> */}
    </div>
  )
}

export default App
// https://media.istockphoto.com/id/1347233834/photo/happy-smiling-groceries-or-kirana-merchant-small-business-owner-counting-money-by-looking-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=hvYRLawatOtr6MXwY3dbZJDGAAox9fYuPOj6xfCaF0s=


// https://media.istockphoto.com/id/1347233774/photo/kirana-or-grocery-merchant-busy-measuring-weight-of-pigeon-pea-on-weighing-scale-before.webp?a=1&b=1&s=612x612&w=0&k=20&c=PJpZjIiPOZGhsUh5ccqsWS2Ti-Ee4cDhcqkC8sDgzro=

// https://media.istockphoto.com/id/1360178437/photo/indian-groceries-business-man-noting-orders-while-talking-with-customer-on-mobile-phone-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=95uwiMlLDefTbuAOwWGPzhPH6urZeG_i8LpMkXMF51Y=

// https://media.istockphoto.com/id/1213542890/photo/woman-checking-product-details-online-using-mobile-phone-at-grocery-store.jpg?s=612x612&w=0&k=20&c=T7DZFgTO9DQqZI_ZTNEwm38dnkm-6lDnHFKH7cv_wkE=

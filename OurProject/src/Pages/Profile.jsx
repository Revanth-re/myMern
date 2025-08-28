import React from 'react'
import Signup from './Signup'
import UserProfile from './UserProfile'



const Profile = () => {
  const tokenFromLs=JSON.parse(localStorage.getItem("userToken"))
 

  return (
    <div className='mt-10'>

      
     {tokenFromLs?<UserProfile/>:<Signup></Signup>}



    </div>
  )
}

export default Profile

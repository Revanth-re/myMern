import React from 'react'
import { useNavigate } from 'react-router-dom'


const AddPersnolStore = () => {
    const Navigate=useNavigate()
  return (
    <div className='mt-20'>

hello
<button onClick={()=>Navigate("/addownstore")} className='`w-full px-4 py-2 rounded-lg font-semibold bg-indigo-500 hover:bg-indigo-600 text-white'>Add-own-Store</button>



      
    </div>
  )
}

export default AddPersnolStore

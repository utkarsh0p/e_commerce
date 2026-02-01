import React from 'react'
import {useState} from "react"
import CreateProduct from '../component/CreateProduct.jsx'
import AllProduct from '../component/AllProduct.jsx'

const AdminPannel = () => {
  const [selected , setSelected] = useState({
    createProduct:true,
    allProduct:false
  })

  const allProductHandler =()=>{
    setSelected((state)=>({
      ...state,
      allProduct:true
    }))
  }

  const createProductHandler =()=>{
    setSelected((state)=>({
      ...state,
      allProduct:false
    }))
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="flex justify-center gap-5">
        <div className="bg-tan text-white px-4 rounded py-2" onClick={createProductHandler}>Create Product</div>
        <div className="bg-tan text-white px-4 rounded py-2" onClick={allProductHandler}>All Products</div>
      </div>
      <div className="w-[90%] md:w-[40%] mt-6">
      {selected.allProduct ?<AllProduct/>:<CreateProduct/>}
      </div>
    </div>
  )
}

export default AdminPannel
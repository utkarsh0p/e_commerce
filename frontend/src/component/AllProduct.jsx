import React from 'react'
import { useProductStore } from '../store/useProductStore.js'

const AllProduct = () => {

  const {fetchAllProducts,setProducts,products} = useProductStore()

  const submitHandler=async(e)=>{
    e.preventDefault()
    const allFetchedProducts =await fetchAllProducts()
    setProducts(allFetchedProducts.products)
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <button>Get all product</button>
      </form>
    </div>
  )
}

export default AllProduct
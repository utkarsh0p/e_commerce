import React from 'react'
import jeans from '/jeans.png'
import tshirt from '/tshirt.png'
import bag from '/bags.png'
import shoes from '/shoes.png'
import glasses from '/glasses.png'
import jacket from '/jackets.png'
import {useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="home-image-container flex flex-wrap justify-center md:gap-5 mt-10">
      <div className="box group" onClick={()=>navigate('/category/jeans')}>
        <img src={jeans} alt=""/>
        <div className="overlay">Jeans</div>
      </div>

      <div className="box" onClick={()=>navigate('/category/t-shirts')}>
        <img src={tshirt} alt=""/>
        <div className="overlay">T-Shirt</div>
      </div>

      <div className="box" onClick={()=>navigate('/category/glasses')}>
        <img src={glasses} alt="" />
        <div className="overlay">Glasses</div>
      </div>

      <div className="box" onClick={()=>navigate('/category/bag')}>
        <img src={bag} alt="" />
        <div className="overlay">Bag</div>
      </div>
      
      <div className="box" onClick={()=>navigate('/category/shoes')}>
        <img src={shoes} alt="" />
        <div className="overlay">Shoes</div>
      </div>

      <div className="box" onClick={()=>navigate('/category/jackets')}>
        <img src={jacket} alt="" />
        <div className="overlay">Jacket</div>
      </div>
        
    </div>
    </>
  )
}

export default HomePage
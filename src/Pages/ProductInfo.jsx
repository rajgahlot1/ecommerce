import React, { useState } from 'react'
// import img from '../imgs/product2.png'
import Layout from '../Components/Layout'
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
// import {products} from '../Components/ProductCart'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { useFirebase } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../Loader/Loader';
const products = [
  {
    id: 1,
    title: "Vintage Wooden Jewelry Box",
    image: "https://m.media-amazon.com/images/I/71ZylCJbG4L._AC_SY200_.jpg",
    desc: "Elegant Vintage Wooden Jewelry Box with intricate carvings. Perfect for storing cherished accessories.",
    price: 151,
    trendingProduct: true,
    quantity: 5
  },
  {
    id: 2,
    title: "Artisan Brass Candle Holder",
    image: "https://m.media-amazon.com/images/I/81I-3uk8F0L._AC_SY200_.jpg",
    desc: "Sophisticated Brass Candle Holder with an artisanal touch. Adds a classic and refined look to any room.",
    price: 160,
    trendingProduct: false,
    quantity: 3
  },
  {
    id: 3,
    title: "Handmade Ceramic Vase",
    image: "https://m.media-amazon.com/images/I/81Q+O4p76YL._AC_SY200_.jpg",
    desc: "Charming Handmade Ceramic Vase with unique glaze and design. Ideal for fresh or dried flowers.",
    price: 171,
    trendingProduct: true,
    quantity: 7
  },
  {
    id: 4,
    title: "Bamboo Woven Basket",
    image: "https://m.media-amazon.com/images/I/51x5YE-9TpL._AC_SY200_.jpg",
    desc: "Sustainable Bamboo Woven Basket, crafted to combine functionality with eco-friendly style. Great for storage.",
    price: 180,
    trendingProduct: false,
    quantity: 2
  },
  {
    id: 5,
    title: "Leather Bound Journal",
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/img19/Sports/GW_Desktop/1199101_379x304_Compressed._SY304_CB448278349_.jpg",
    desc: "Luxurious Leather Bound Journal with a classic design. Ideal for writing and preserving your thoughts.",
    price: 191,
    trendingProduct: true,
    quantity: 10
  },
  {
    id: 6,
    title: "Decorative Glass Lamp",
    image: "https://m.media-amazon.com/images/I/51YozQT-j+L._AC_SY200_.jpg",
    desc: "Artistic Decorative Glass Lamp with a distinct and colorful design. Perfect for adding ambiance to your space.",
    price: 200,
    trendingProduct: false,
    quantity: 6
  },
  {
    id: 7,
    title: "Cotton Handwoven Rug",
    image: "https://m.media-amazon.com/images/I/81I-3uk8F0L._AC_SY200_.jpg",
    desc: "Beautifully Handwoven Cotton Rug with a traditional pattern. Adds warmth and style to any room.",
    price: 210,
    trendingProduct: true,
    quantity: 4
  },
  {
    id: 8,
    title: "Copper Water Bottle",
    image: "https://m.media-amazon.com/images/I/61bld2QeAkL._AC_SY200_.jpg",
    desc: "Elegant Copper Water Bottle designed for health and style. Helps keep your drinks cool and supports artisans.",
    price: 221,
    trendingProduct: false,
    quantity: 8
  }
]; 
// useFirebase

const ProductInfo = () => {
const [product,setProduct]= useState("")  
  const firebase=useFirebase();
  const [loading,setLoading]= useState(true)
  // const {  getAllProduct, getAllProductFunction } = firebase;
  const { id } = useParams();
  console.log("hell is os ",id)
  // setLoading(false)
const getProductData= async()=>{
setLoading(true)
  try {
  const productTemp= await getDoc(doc(firebase.database,"products",id))
  setProduct(productTemp.data())
  console.log("hello raja",product)
setLoading(false)

} catch (error) {
  console.log(error)
  setLoading(false)

}
}
  useEffect(() => {
  getProductData();
    window.scrollTo(0, 0);
  }, []);
  
  //                  
  return (
    <Layout >
        {loading?<div className='mt-4 h-100 d-flex align-items-center'><Loader /></div>: 
      <div className="mt-2 row m-0 " >
        <div className='col-12 col-sm d-flex align-items-center justify-content-center h-100'><img className="w-100" src={`${product.productImgUrl}`}  alt="jj"  style={{minWidth:"270px", height:"100%"}} /></div>
        <div className='col d-flex gap-3 justify-content-between flex-column'><h3>{product.title}</h3>
        <div style={{cursor:"pointer"}} className="d-flex gap-2">
        <FaRegStar style={{color:"#f94144"}}/>
        <FaRegStar style={{color:"#f94144"}}/>
        <FaRegStar style={{color:"#f94144"}}/>
        <FaRegStar style={{color:"#f94144"}}/>
        <FaStarHalfAlt style={{color:"#f94144"}}/>
        </div>
        <h4>₹{product.price}</h4> 
        <h5>Description: </h5>
        <p>{product.description? product.description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quibusdam modi commodi vitae porro saepe. Deleniti, sit reprehenderit voluptates et reiciendis fugit tenetur, nulla aspernatur ea minima neque sapiente ducimus!"}</p>
        <p>{!product.description? product.description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quibusdam modi commodi vitae porro saepe. Deleniti, sit reprehenderit voluptates et reiciendis fugit tenetur, nulla aspernatur ea minima neque sapiente ducimus!"}</p>
{/* <div className='bg-danger'> drhrh<Loader/></div> */}
                    <Button variant='danger'>Add to cart</Button>
        </div>

      </div>}
    </Layout>
  )
}

export default ProductInfo  

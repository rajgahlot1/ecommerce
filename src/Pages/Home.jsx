import React from 'react'
import img1 from '../imgs/img1.png'
import img2 from '../imgs/img2.png'
import Carousel from 'react-bootstrap/Carousel';
import img3 from '../imgs/img3.png'
import img4 from '../imgs/img4.png'
import Layout from '../Components/Layout';
import {ProductCart} from '../Components/ProductCart';
import Track from '../Components/Track';
import Testimonial from '../Components/Testimonial';
// import Nav from "./Nav.js"
import Category from '../Components/Category';
const Home = () => {

    return (
    <Layout>

   <UncontrolledExample/>
   <Category/>
   <ProductCart/>
   <Track/>
   <Testimonial/>
   </Layout>
  )
} 
 function UncontrolledExample() {

   return (
     <Carousel className='homepage'>
       <Carousel.Item>
       <ItemData indx="0" />
       </Carousel.Item>
       <Carousel.Item>
       <ItemData indx="1" />
       </Carousel.Item>
       <Carousel.Item>
       <ItemData indx="2" />
           </Carousel.Item>
           <Carousel.Item>
    <ItemData indx="3" />
           </Carousel.Item>
     </Carousel>
   );
 }
 
 const ItemData=({indx})=>{
    const tradeInOffers = [
        {
          text1: 'Trade-in-offer Smartphones',
          text2: 'Amazing Discounts',
          text3: 'Limited Time Offer',
          text4: 'Save big on latest models',
          text5: 'Shop Now'
        },
        {
          text1: 'Trade-in-offer Laptops',
          text2: 'Best Deals',
          text3: 'Top Brands',
          text4: 'Get up to 50% off',
          text5: 'Shop Now'
        },
        {
          text1: 'Trade-in-offer Home Appliances',
          text2: 'Exclusive Offers',
          text3: 'Upgrade Your Home',
          text4: 'Up to 60% off',
          text5: 'Shop Now'
        },
        {
          text1: 'Trade-in-offer Fashion',
          text2: 'Trending Styles',
          text3: 'New Arrivals',
          text4: 'Save with special coupons',
          text5: 'Shop Now'
        },
        {
            text1: 'Trade-in-offer Laptops',
            text2: 'Best Deals',
            text3: 'Top Brands',
            text4: 'Get up to 50% off',
            text5: 'Shop Now'
          },
  
      ];
      
      const images = [img1, img2, img3, img4];
    return(
    <div className='row' style={{height:"calc(100vh - 68px)"}}>
        <div className='col d-flex flex-column  justify-content-center'>
        <h1 className='ms-5 text1 fs-1'>{tradeInOffers[indx].text1}</h1>
        <h2 className='ms-5 p-3 ps-0'>{tradeInOffers[indx].text2} </h2>
        <h3 className='ms-5'>{tradeInOffers[indx].text3} </h3>
        <p  className='ms-5 fs-1 text-danger'>{tradeInOffers[indx].text4} </p>
        <div className='ms-5 btn btn-danger' style={{width:"100px"}}>{tradeInOffers[indx].text5} </div></div>
        <div className='col d-none d-sm-flex align-items-center justify-content-center'><img className='img-fluid homeImage' src={images[indx]} alt="" /></div>
    </div>
)
 }
export default Home
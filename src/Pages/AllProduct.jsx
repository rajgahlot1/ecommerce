import React, {  useEffect } from 'react'
import {addToCart,deleteFromCart} from '../redux/CartSlice'
import { useDispatch, useSelector } from "react-redux";
import Layout from '../Components/Layout'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
// import { products } from '../Components/ProductCart';
import { useFirebase } from '../Firebase';
// useEffect
const AllProduct = () => {
  const firebase=useFirebase();
  const {  getAllProduct, getAllProductFunction, myId } = firebase;
          const navigate= useNavigate();
          // console.log("hello",getAllProduct)
          useEffect(() => {
            getAllProductFunction();
          }, []);
          const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (val) => {
    console.log(myId, "dgdgd");
    dispatch(addToCart(val));
    console.log("success");
  };
  const deletCart = (val) => {
    dispatch(deleteFromCart(val));
    console.log("delete success");
  };

  useEffect(() => {
    localStorage.setItem(myId, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
        <div><h2 className='text-center m-2'>All Product</h2>
        <div className='d-flex flex-wrap align-items-center justify-content-evenly'>
    {getAllProduct.map((val,ind)=>{
      // console.log("jjjj",val,val.id)
        return(
<Card  style={{ width: '18rem', height:"468px" }} className='m-2' key={ind}>
              <Card.Img variant="top" onClick={()=>navigate(`/ecommerce/productinfo/${val.id}`)} src={val.productImgUrl} style={{cursor:"pointer",height:"300px"}}/>
              <Card.Body className='position-relative'>
                <Card.Title style={{height:"53px"}}>{val.title}</Card.Title>
                <Card.Text className='fw-bold'>
                ₹ {val.price}
                </Card.Text>
                {
                  cartItems.some((p)=>p.id===val.id)?
                <Button variant="primary" className='w-100 position-relative bottom-0' onClick={()=>deletCart(val)}>Delete from Cart</Button>
                :<Button variant="primary" className='w-100 position-relative bottom-0'  onClick={()=>addCart(val)}>Add to Cart</Button>
    }</Card.Body>
            </Card>

        )
    })}
            </div>
        </div>
    </Layout>
  )
}

export default AllProduct
// import React from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../Firebase";
import { useEffect } from 'react';
// useEffect


const ProductCart = () => {

  const firebase=useFirebase();
  const {  getAllProduct, getAllProductFunction } = firebase;
          const navigate= useNavigate();
          console.log("hello",getAllProduct)
          useEffect(() => {
            getAllProductFunction();
          }, []);
        return (
<div className='d-flex flex-wrap align-items-center justify-content-evenly'>
    {getAllProduct.map((val,ind)=>{
        return(
<Card  style={{ width: '18rem', height:"468px" }} className='m-2' key={ind}>
              <Card.Img variant="top" onClick={()=>navigate(`productinfo/${val.id}`)} src={val.productImgUrl} style={{cursor:"pointer",height:"300px"}}/>
              <Card.Body className='position-relative'>
                <Card.Title style={{height:"53px"}}>{val.title}</Card.Title>
                <Card.Text className='fw-bold'>
                ₹ {val.price}
                </Card.Text>
                <Button variant="primary" className='w-100 position-relative bottom-0'>Add to Cart</Button>
              </Card.Body>
            </Card>

        )
    })}
            </div>
          );
        }


// function BasicExample() {
 

// export default BasicExample;
export {ProductCart}
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../Firebase";
import { fetchUserCartItems, modifyCart } from '../Pages/FirebaseUtils';

const ProductCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { getAllProduct, getAllProductFunction, userData, database } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductFunction();
    if (userData?.userId) {
      fetchUserCartItems(database, userData.userId).then(setCartItems);
    }
  }, [getAllProductFunction, userData, database]);

  const handleCartModification = (product, action) => {
    if (userData?.userId) {
      modifyCart(database, userData.userId, product, action).then(() => {
        fetchUserCartItems(database, userData.userId).then(setCartItems);
      });
    }
  };
  
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };
  
  return (
    <div className='d-flex flex-wrap align-items-center justify-content-evenly'>
      {getAllProduct.map((val) => {
        const inCart = isProductInCart(val.id);
        console.log(inCart)
        return (
          <Card style={{ width: '18rem', height: "468px" }} className='m-2' key={val.id}>
            <Card.Img variant="top" onClick={() => navigate(`productinfo/${val.id}`)} src={val.productImgUrl} style={{ cursor: "pointer", height: "300px" }} />
            <Card.Body className='position-relative'>
              <Card.Title style={{ height: "53px" }}>{val.title}</Card.Title>
              <Card.Text className='fw-bold'>
                ₹ {val.price}
              </Card.Text>
              <Button
                variant="primary"
                className='w-100 position-relative bottom-0'
                onClick={() => handleCartModification(val, inCart ? 'remove' : 'add')}
              >
                {inCart ? 'Remove from Cart' : 'Add to Cart'}
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export { ProductCart };

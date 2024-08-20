import React, { useEffect, useState } from 'react';
import Layout from "../Components/Layout";
import { MdDeleteOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, deleteFromCart, setCart } from '../CartSlice';
import { useFirebase } from "../Firebase";
import { fetchUserCartItems, saveCartToFirestore, deleteCartItem, createOrder } from './FirebaseUtils';
import BuyNowModels from "../BuyNowModels";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobilenumber: "",
    date: new Date().toLocaleString("en-us", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  });
  const [buyNowModal, setBuyNowModal] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userData, database } = useFirebase();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  useEffect(() => {
    if (user) {
      fetchUserCartItems(database, user.userId).then((items) => dispatch(setCart(items)));
    }
  }, [user, database, dispatch]);

  useEffect(() => {
    if (user) {
      saveCartToFirestore(database, user.userId, cartItems);
    }
  }, [cartItems, user, database]);

  const handleBuyNow = async () => {
    if (user) {
      const orderData = {
        cartItems,
        addressInfo,
        email: user.email,
        name: user.username,
        userid: user.userId,
        status: "confirmed",
        date: addressInfo.date,
        time: addressInfo.time,
      };
      await createOrder(database, orderData);
      setBuyNowModal(false);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobilenumber: "",
        date: addressInfo.date,
        time: addressInfo.time,
      });
    }
  };

  const handleQuantityChange = (id, change) => {
    dispatch(change === 'increment' ? incrementQuantity(id) : decrementQuantity(id));
  };

  const handleDelete = async (item) => {
    dispatch(deleteFromCart(item));
    if (user) {
      await deleteCartItem(database, user.userId, item);
    }
  };

  const CartItemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
  const CartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="p-2 d-flex pb-5 flex-column">
        <h1 className="text-center">Shopping Cart</h1>
        <div className="Cart_main_second d-flex flex-wrap justify-content-center justify-content-lg-between gap-4 mt-3">
          <div className="Cart_First d-flex flex-column gap-4">
            {cartItems.length > 0 ? (
              cartItems.map(({ id, title, price, productImgUrl, quantity, category }) => (
                <div className="Product_card p-2" key={id} style={{ width: "350px" }}>
                  <div className="d-flex gap-2">
                    <img src={productImgUrl} alt="Product_img" className="img-fluid" style={{ width: "80px", aspectRatio: "1" }} />
                    <div>
                      <h5>{title}</h5>
                      <h6>{category}</h6>
                      <p>₹ {price}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex align-items-center gap-3">
                      <button onClick={() => handleQuantityChange(id, 'decrement')} style={{ width: "30px", border: "none", background: "#fff", cursor: "pointer" }}>-</button>
                      <span style={{ fontSize: "18px" }}>{quantity}</span>
                      <button onClick={() => handleQuantityChange(id, 'increment')} style={{ width: "30px", border: "none", background: "#fff", cursor: "pointer" }}>+</button>
                    </div>
                    <div className="d-flex justify-content-end">
                      <MdDeleteOutline className="fs-5" onClick={() => handleDelete({ id, price, productImgUrl, title, category })} style={{ color: "red", cursor: "pointer" }} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center w-100'>No Items Found</div>
            )}
          </div>
          <div className="Cart_Second d-flex flex-column gap-4 align-items-center">
            <div className="Cart_Item_Container">
              <h3 className='text-center'>Total Item(s) {CartItemTotal}</h3>
              <h4 className='text-center'>Total Amount: <FaIndianRupeeSign /> {CartTotal}</h4>
            </div>
            <button className='btn btn-success' onClick={() => setBuyNowModal(true)}>Buy Now</button>
            <BuyNowModels
              show={buyNowModal}
              onHide={() => setBuyNowModal(false)}
              addressInfo={addressInfo}
              setAddressInfo={setAddressInfo}
              BuyNowFunction={handleBuyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

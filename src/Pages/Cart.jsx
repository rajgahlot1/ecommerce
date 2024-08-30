


import { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";


import Layout from "../Components/Layout";
import { MdDeleteOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import BuyNowModels from "../BuyNowModels";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { fetchCartData, removeFromCart  } = firebase;
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const data = firebase.userData;
    setUser(data);
  }, [firebase.userData]);

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await fetchCartData();
      setCartItems(items);
    };

    loadCartItems();
  }, [fetchCartData]);

  const deleteCart = async (product) => {
    await removeFromCart(product.id); // Call the function from firebase
    setCartItems(cartItems.filter(item => item.id !== product.id)); // Remove item from UI
  };

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
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });

 
 

  

  const BuyNowFunction = async () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user?.email,
      name: user?.username,
      userid: user?.userId,
      status: "confirmed",
      date: new Date().toLocaleString("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      time: time,
    };

    try {
      const orderRef = collection(firebase.database, "orders");
      await addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobilenumber: "",
        date: new Date().toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: time,
      });
      console.log("Success: Order added");
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };
  const handleIncrement = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };
  

  const CartItemTotal = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  
  const CartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  console.log("quen",CartTotal)

  return (
    <>
      <Layout>
        <div className="Cart_main p-2  d-flex pb-5 flex-column">
          <h1 className="text-center">Shopping Cart</h1>
          <div className="Cart_main_second d-flex flex-wrap justify-content-center justify-content-lg-between gap-4 mt-3">
            <div className="Cart_First d-flex flex-column gap-4">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((val) => {
                    console.log(val);
                    const {
                      id,
                      title,
                      price,
                      productImgUrl,
                      quantity,
                      category,
                    } = val;
                    return (
                      <div
                        className="Product_card p-2"
                        key={id}
                        style={{ width: "350px" }}
                      >
                        <div className="d-flex gap-2">
                          <img
                            onClick={() => navigate(`/ProductInfo/${val.id}`)}
                            src={productImgUrl}
                            alt="Product_img"
                            className="img-fluid"
                            style={{ width: "80px",height:"80px" }}
                          />
                          <div>
                            <h4 className="pb-0 mb-0">{title}</h4>
                            <span
                              className="d-flex gap-4 mb-0 pb-0"
                              style={{ color: "#d4d3d3" }}
                            >
                              <p className="mb-1">{category}</p>
                            </span>
                            <div className="d-flex gap-2">
                              <span>
                                <p className="mb-0 fw-bold fs-6">
                                  <FaIndianRupeeSign /> {price}
                                </p>
                              </span>
                              <span>
                                <p
                                  style={{
                                    color: "#34ea34",
                                    marginBottom: "0px",
                                  }}
                                >
                                  5% off
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mt-3 gap-5">
                          <div className="d-flex gap-2 fw-bold">
                            <button
                              onClick={() => handleDecrement(val.id)}
                              style={{
                                width: "30px",
                                border: "none",
                                fontWeight: "700",
                                fontSize: "15px",
                              }}
                            >
                              -
                            </button>
                            {quantity }
                            <button
                              onClick={() => handleIncrement(val.id)}
                              style={{
                                width: "30px",
                                border: "none",
                                fontWeight: "700",
                                fontSize: "15px",
                              }}
                            >
                              +
                            </button>
                          </div>
                          <span
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deleteCart(val)}
                          >
                            <MdDeleteOutline /> Remove
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <h2 className="fst-italic">Product not found</h2>
              )}
            </div>

            <div
              className="Cart_second d-flex flex-column gap-3 p-2"
              style={{ width: "382px" }}
            >
              <span style={{ borderBottom: "1px solid #737373" }}>
                <h5>Price Details</h5>
              </span>
              <div className="d-flex flex-row justify-content-between mb-0">
                <p className="mb-0">Price ({CartItemTotal} item)</p>{" "}
                <p className="mb-0">
                  <FaIndianRupeeSign /> {CartTotal}
                </p>
              </div>

              <div className="d-flex flex-row justify-content-between mb-0">
                <p className="mb-0">Delivery Charges</p>{" "}
                <p className="mb-0" style={{ color: "#34ea34" }}>
                  Free
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between mb-0">
                <h5 className="mb-0">Total Amount</h5>{" "}
                <h5 className="mb-0">
                  <FaIndianRupeeSign /> {CartTotal}
                </h5>
              </div>
              <span className="text-center">
                <BuyNowModels
                  addressInfo={addressInfo}
                  setaddressInfo={setAddressInfo}
                  BuyNowFunction={BuyNowFunction}
                />
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

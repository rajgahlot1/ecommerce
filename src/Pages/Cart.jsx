import Layout from "../Components/Layout";
import { MdDeleteOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { incrementQuantity, decrementQuantity, deleteFromCart } from '../CartSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import BuyNowModels from "../BuyNowModels";

// const cartdata = [
//   {
//     id: 1,
//     name: "Nike Air Force 1 07 LV8",
//     color: "Orange",
//     size: "8 UK",
//     original_price: 49900,
//     discounted_price: 47199,
//     discount: "5% Off",
//     quantity: 1,
//     image_url: "https://m.media-amazon.com/images/I/81I-3uk8F0L._AC_SY200_.jpg",
//   },
//   {
//     id: 2,
//     name: "Nike Blazer Low 77 SE",
//     color: "White",
//     size: "8 UK",
//     original_price: 2499,
//     discounted_price: 1549,
//     discount: "38% Off",
//     quantity: 1,
//     image_url: "https://m.media-amazon.com/images/I/81Q+O4p76YL._AC_SY200_.jpg",
//   },
//   {
//     id: 3,
//     name: "Nike Air Max 90",
//     color: "Black",
//     size: "8 UK",
//     original_price: 9995,
//     discounted_price: 2219,
//     discount: "78% Off",
//     quantity: 1,
//     image_url: "https://m.media-amazon.com/images/I/51x5YE-9TpL._AC_SY200_.jpg",
//   },
//   {
//     id: 4,
//     name: "Nike Dunk Low",
//     color: "Green",
//     size: "9 UK",
//     original_price: 8000,
//     discounted_price: 7200,
//     discount: "10% Off",
//     quantity: 1,
//     image_url:
//       "https://images-eu.ssl-images-amazon.com/images/G/31/img19/Sports/GW_Desktop/1199101_379x304_Compressed._SY304_CB448278349_.jpg",
//   },
//   {
//     id: 5,
//     name: "Nike ZoomX Vaporfly",
//     color: "Blue",
//     size: "10 UK",
//     original_price: 15000,
//     discounted_price: 13500,
//     discount: "10% Off",
//     quantity: 1,
//     image_url: "https://m.media-amazon.com/images/I/51YozQT-j+L._AC_SY200_.jpg",
//   },
// ];
const Cart = () => {
  const [user, setUser] = useState(null);
  const [addressInfo, setaddressInfo] = useState({
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
  const [cartItems, setCartItems] = useState(useSelector((state) => state.cart));
  const dispatch = useDispatch();
  const firebase = useFirebase();

  useEffect(() => {
    const data = firebase.userData;
    setUser(data);
  }, [firebase.userData]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const BuyNowFunction = async () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
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
      const orderRef = collection(firebase.database, 'orders');
      await addDoc(orderRef, orderInfo);
      setaddressInfo({
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

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const deleteCart = (val) => {
    dispatch(deleteFromCart(val));
    console.log("Delete success");
  };

  const CartItemTotal = cartItems.map((item) => item.quantity).reduce((prevValue, currentValue) => prevValue + currentValue, 0);
  const CartTotal = cartItems.map((item) => item.price * item.quantity).reduce((prevValue, currentValue) => prevValue + currentValue, 0);

   return (
    <Layout>
        <div className="Cart_main p-2 container d-flex  pb-5 flex-column">
          <h1 className="text-center">Shopping Cart</h1>
          <div className="Cart_main_second d-flex flex-wrap justify-content-center justify-content-lg-between gap-4 mt-3">
            <div className="Cart_First d-flex flex-column gap-4">
              {/* first */}
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((val) => {
                    const { id, title, price, productImgUrl, quantity, category } = val;
                    return (
                      <div className="Product_card p-2" key={id} style={{ width: "350px" }}>
                        <div className="d-flex gap-2">
                          <img src={productImgUrl} alt="Product_img" className="img-fluid" style={{ width: "80px", aspectRatio: "1" }} />
                          <div>
                            <h4 className="pb-0 mb-0">{title}</h4>
                            <span className="d-flex gap-4 mb-0 pb-0" style={{ color: "#d4d3d3" }}>
                              <p className="mb-1">{category}</p>
                            </span>
                            <div className="d-flex gap-2">
                              <span>
                                <p className="mb-0 fw-bold fs-6"><FaIndianRupeeSign /> {price}</p>
                              </span>
                              <span>
                                <p style={{ color: "#34ea34", marginBottom: "0px" }}>5% off</p>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mt-3 gap-5">
                          <div className="d-flex gap-2 fw-bold">
                            <button onClick={() => handleDecrement(val.id)} style={{ width: "30px", border: "none", fontWeight: "700", fontSize: "15px" }}>-</button>
                            {quantity}
                            <button onClick={() => handleIncrement(val.id)} style={{ width: "30px", border: "none", fontWeight: "700", fontSize: "15px" }}>+</button>
                          </div>
                          <span style={{ color: "red", cursor: "pointer" }} onClick={() => deleteCart(val)}><MdDeleteOutline /> Remove</span>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <h2 className="fst-italic">Product not found</h2>
              )}
            </div>

            <div className="Cart_second d-flex flex-column gap-3 p-2" style={{ width: "382px" }}>
              <span style={{ borderBottom: "1px solid #737373" }}><h5>Price Details</h5></span>
              <div className="d-flex flex-row justify-content-between mb-0">
                <p className="mb-0">Price ({CartItemTotal} item)</p> <p className="mb-0"><FaIndianRupeeSign /> {CartTotal}</p>
              </div>

              <div className="d-flex flex-row justify-content-between mb-0">
                <p className="mb-0">Delivery Charges</p> <p className="mb-0" style={{ color: "#34ea34" }}>Free</p>
              </div>
              <div className="d-flex flex-row justify-content-between mb-0">
                <h5 className="mb-0">Total Amount</h5> <h5 className="mb-0"><FaIndianRupeeSign /> {CartTotal}</h5>
              </div>
              <span className="text-center">
                <BuyNowModels
                  addressInfo={addressInfo}
                  setaddressInfo={setaddressInfo}
                  BuyNowFunction={BuyNowFunction}
                />
              </span>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default Cart;

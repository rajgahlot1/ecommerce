import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import { useFirebase } from "../Firebase";
import { getDocs, collection } from "firebase/firestore";

import Loader from '../Loader/Loader'
export default function AllProduct() {
  const firebase = useFirebase();
  const { getAllProduct, addToCart, removeFromCart, user, database } = firebase; // Destructure necessary values
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state add karein

  // Fetch the cart items when the component mounts
  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        const cartSnapshot = await getDocs(collection(database, `users/${user.uid}/cartItems`));
        const cartList = cartSnapshot.docs.map((doc) => doc.data());
        setCartItems(cartList.map((item) => item.id));
        setLoading(false);
      };
      fetchCartItems();
    }
  }, [user]);

  const isInCart = (productId) => cartItems.includes(productId);

  if (loading) {
    return <div className="position-relative" style={{width:"100px",right:"-45%",top:"100px"}}><Loader/></div>; // Jab tak data fetch ho raha hai, loading dikhayein
  }

  return (
    <Layout>
      <div className="Card_main d-flex flex-wrap w-100 p-3 flex-column position-relative align-items-center justify-content-center">
        <h3 className="text-center mb-4">All Products</h3>
        <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center w-100">
          {getAllProduct.map((val) => {
            const { id, title, price, productImgUrl } = val;
            const inCart = isInCart(id);

            return (
              <div
                key={id}
                className="card position-relative"
                style={{
                  width: "18rem",
                  height: "410px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <div className="dalju p-1 w-100 h-50">
                  <img
                    onClick={() => navigate(`/ecommerce/productinfo/${val.id}`)}
                    style={{ objectFit: "contain" }}
                    className="card-img-top h-100 w-100"
                    src={productImgUrl}
                    alt="cap"
                  />
                </div>
                <div
                  className="card-body position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <p className="card-title" style={{ color: "gray" }}>
                    Buy Smart
                  </p>
                  <h6 className="card-text">{title}</h6>
                  <h5>
                    <MdCurrencyRupee />
                    {price}
                  </h5>
                  <button
                    className="btnn fw-bold w-100 mt-2"
                    style={{ borderRadius: "6px", height: "40px" }}
                    onClick={() => {
                      if (inCart) {
                        removeFromCart(id);
                        setCartItems((prev) =>
                          prev.filter((item) => item !== id)
                        );
                      } else {
                        addToCart(val);
                        setCartItems((prev) => [...prev, id]);
                      }
                    }}
                  >
                    {inCart ? "Delete Product" : "Add To Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

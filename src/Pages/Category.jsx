import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { MdCurrencyRupee } from "react-icons/md";
import logo from '../imgs/logo3.png'

import { useFirebase } from "../Firebase";
import { addToCart, deleteFromCart } from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Cateogory() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { getAllProduct, myId ,getAllProductFunction} = firebase;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProductFunction();
  }, []);
  const addCart = (val) => {
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

  // Filter products based on the selected category
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const FilterProduct = getAllProduct.filter(
    (obj) => obj.category === categoryName
  );
  return (
    <>
      <Layout>
        <div className="   Card_main d-flex flex-wrap w-100 p-3 flex-column position-relative align-items-center justify-content-center">
          <h3 className="text-center mb-4">{categoryName}</h3>
          <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center w-100 ">
            {FilterProduct.length > 0 ? (
              <>
                {FilterProduct.map((val) => {
                  const { title, price, productImgUrl } = val;
                  return (
                    <div
                      key={val.id}
                      className="card position-relative"
                      style={{
                        width: "18rem",
                        height: "410px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        onClick={() =>
                          navigate(`/ecommerce/productinfo/${val.id}`)
                        }
                        className="card-img-top w-100 h-50"
                        src={productImgUrl}
                        alt="t"
                      />
                      <div
                        className="card-body position-relative"
                        style={{ cursor: "pointer" }}
                      >
                        <p className="card-title" style={{ color: "gray" }}>
                        <img src={logo} alt="" style={{height:"40px"}}/>
                        </p>
                        <h6 className="card-text">{title}</h6>
                        <h5>
                          <MdCurrencyRupee />
                          {price}
                        </h5>
                        {cartItems.some((p) => p.id === val.id) ? (
                          <button
                            className="btnn fw-bold w-100 mt-2"
                            style={{ borderRadius: "6px", height: "40px" }}
                            onClick={() => deletCart(val)}
                          >
                            Delete To Cart
                          </button>
                        ) : (
                          <button
                            className="btnn fw-bold w-100 mt-2"
                            style={{ borderRadius: "6px", height: "40px" }}
                            onClick={() => addCart(val)}
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h3 style={{ height: "600px" }}>not product Found</h3>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

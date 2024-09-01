
import Layout from "../Components/Layout";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Firebase";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";

export default function ProductInfo() {
  const firebase = useFirebase();
  const { addToCart, removeFromCart, getProductById, user, database } = firebase;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { id } = useParams();

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
  }, [user, database]);

  useEffect(() => {
    const fetchProduct = async () => {
      // Fetch the product document snapshot using getDoc
      const productDocRef = doc(database, "products", id); // Replace "products" with your actual collection name
      const productDoc = await getDoc(productDocRef);

      if (productDoc.exists()) {
        const productData = productDoc.data();
        setProduct({ id: productDoc.id, ...productData }); // Manually add the Firestore document ID
      } else {
        setProduct(null); // Handle the case where the product doesn't exist
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, database]);

  const isInCart = (productId) => cartItems.includes(productId);

  if (loading || !product) {
    return <Loader />;
  }

  const inCart = product && product.id && isInCart(product.id);

  return (
    <>
      <Layout>
        <div className="Info_main bg-light dalju" style={{height:"900px"}}>
          <div className="d-flex gap-5 flex-wrap m-4">
            <div className="Info_img bg-dalju p-5" style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "380px" }}>
              <img src={product.productImgUrl} alt="info_img" className="h-100 w-100" />
            </div>
            <div className="Info_img" style={{ width: "380px" }}>
              <h2>{product.title}</h2>
              <div style={{ cursor: "pointer" }} className="d-flex gap-2">
                <FaRegStar style={{ color: "#f94144" }} />
                <FaRegStar style={{ color: "#f94144" }} />
                <FaRegStar style={{ color: "#f94144" }} />
                <FaRegStar style={{ color: "#f94144" }} />
                <FaStarHalfAlt style={{ color: "#f94144" }} />
              </div>
              <h3>Rs.{product.price}</h3>
              <span>Description:</span>
              <p>{product.description}</p>
              <button
                className="btnn fw-bold w-100 mt-2"
                style={{ borderRadius: "6px", height: "40px" }}
                onClick={() => {
                  if (product && product.id) {
                    if (inCart) {
                      removeFromCart(id);
                      setCartItems((prev) => prev.filter((item) => item !== id));
                    } else {
                      addToCart(product);
                      setCartItems((prev) => [...prev, id]);
                    }
                  } else {
                    console.error("Product data or ID is not available", product);
                  }
                }}
              >
                {inCart ? "Delete Product" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

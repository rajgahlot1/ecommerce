import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import Loader from "../Loader/Loader";
import { MdCurrencyRupee } from "react-icons/md";
import { getDocs, collection } from "firebase/firestore";

import { useFirebase } from "../Firebase";

import { useEffect,useState } from "react";


export default function CathogaryPage(){
 
  const {categoryName}=useParams();
  const firebase = useFirebase();
  const { getAllProduct, addToCart, removeFromCart, user, database } = firebase; // Destructure necessary values
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state add karein.

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
    return <div className="position-relative" style={{width:"100px",right:"-45%", top:"100px"}}><Loader/></div>; // Jab tak data fetch ho raha hai, loading dikhayein
    // Jab tak data fetch ho raha hai, loading dikhayein
  }
  
  const FilterProduct = getAllProduct.filter((obj) => obj.category === categoryName);
  console.log(FilterProduct, categoryName)
  return(
    <>
   <Layout>
     <div className='   Card_main d-flex flex-wrap w-100 p-3 flex-column position-relative align-items-center justify-content-center'>
       <h3 className="text-center mb-4">{categoryName}</h3>
       <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center w-100 ">
         {FilterProduct?.length>0?
         <>
           {
             FilterProduct.map((val)=> {
                const {title,price,productImgUrl,id}=val;
               const inCart = isInCart(id);

                return( 
                  <div key={val.id} className="card position-relative" style={{width: "18rem",height:"410px",boxShadow:"0 0 10px rgba(0,0,0,0.1)"}}>
                   <div className=" h-50 w-100 dalju p-1 "><img onClick={()=>navigate(`/ecommerce/productinfo/${val.id}`)} className="card-img-top h-100 w-100" src={productImgUrl} alt="hello"  style={{objectFit:"contain"}}/></div>
                    <div className="card-body position-relative" style={{cursor:"pointer"}}>
                      <p className="card-title" style={{color:"gray"}}>Buy Smart</p>
                      <h6 className="card-text">{title}</h6>
                      <h5><MdCurrencyRupee/>{price}</h5>
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
                )
              })
            }
         </>:<h3>not product Found</h3>
         }
       

       </div>
     </div>
   </Layout>
    </>
  )
}
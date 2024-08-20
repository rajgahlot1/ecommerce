import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { MdCurrencyRupee } from "react-icons/md";

import { useFirebase } from "../Firebase";
import {addToCart,deleteFromCart} from '../CartSlice'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function Cateogory(){
  const {cathogaryname}=useParams();
  const navigate= useNavigate()
  const firebase=useFirebase();
  const {getAllProduct}=firebase;
  const cartItems=useSelector((state)=>state.cart);
  const dispatch=useDispatch();

  const addCart=(val)=>{
    dispatch(addToCart(val));
    console.log("success")
  }
  const deletCart=(val)=>{
    dispatch(deleteFromCart(val))
    console.log("delete success")
  }
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cartItems));
  },[cartItems])
  // Filter products based on the selected category
  const FilterProduct = getAllProduct.filter((obj) => obj.category === cathogaryname);
  return(
    <>
   <Layout>
     <div className='   Card_main d-flex flex-wrap w-100 p-3 flex-column position-relative align-items-center justify-content-center'>
       <h3 className="text-center mb-4">{cathogaryname}</h3>
       <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center w-100 ">
         {FilterProduct.length>0?
         <>
           {
             FilterProduct.map((val)=>{
                const {title,price,productImgUrl}=val;
                return(
                  <div key={val.id} className="card position-relative" style={{width: "18rem",height:"410px",boxShadow:"0 0 10px rgba(0,0,0,0.1)"}}>
                    <img onClick={()=>navigate(`/ecommerce/productinfo/${val.id}`)} className="card-img-top w-100 h-50" src={productImgUrl} alt="t"/>
                    <div className="card-body position-relative" style={{cursor:"pointer"}}>
                      <p className="card-title" style={{color:"gray"}}>Buy Smart</p>
                      <h6 className="card-text">{title}</h6>
                      <h5><MdCurrencyRupee/>{price}</h5>
                      {
                        cartItems.some((p)=>p.id===val.id)?
                         <button className="btnn fw-bold w-100 mt-2" style={{borderRadius:"6px",height:"40px"}} onClick={()=>deletCart(val)}>Delete To Cart</button>:
                          <button className="btnn fw-bold w-100 mt-2" style={{borderRadius:"6px",height:"40px"}} onClick={()=>addCart(val)}>Add To Cart</button>
                      }
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
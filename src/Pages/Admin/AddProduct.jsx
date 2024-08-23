import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { useFirebase } from "../../Firebase";
export default function AddProductPage(){
  const firebase=useFirebase();
  // niche dek mene ese kar diya sahi hai
 const navigate=useNavigate();
 const cathArr=[
   {name:"Fashion"},
   {name:"Shirt"},
   {name:"Jacket"},
   {name:"Mobile"},
   {name:"Laptop"},
   {name:"Shoes"},
   {name:"Home"},
  {name:"Books"},
 ]
 // product state
 const now = new Date();
 const time = now.toLocaleTimeString([], {
   hour: '2-digit',
   minute: '2-digit',
   hour12: true,
 });
 const [product,setProduct]=useState({
   title:"",
   price:"",
   productImgUrl:"",
   category:"",
   description:"",
   quanity:1,
   date: new Date().toLocaleString("en-us", {
     month: "short",
     day: "2-digit",
     year: "numeric",
   }),
   time:time,
   
 });
 // Function to handle form submission
 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
       const productRef = collection(firebase.database, 'products');
       await addDoc(productRef, product)
       toast.success("Add product successfully!");
       navigate('/ecommerce/admin-dashboard')
       // setLoading(false)
   }catch (error) {
     console.error("Error adding document: ", error);
     // Error toast दिखाएं
     toast.error("Failed to add product. Please try again.", {
       position: toast.POSITION.TOP_CENTER,
       autoClose: 3000,
     });
   }
 }
  return(
    <>
    <div className="d-flex text-center  w-100 align-items-center justify-content-center" style={{height:"100vh"}}>
    <div className="dalju flex-column py-5 position-relative p-3" style={{width:"380px",borderRadius:"7px",background:"#ffd6d6",border:"2px solid #e6e5e5"}}>
   <h3 style={{color:"#f94144"}}>Add Product</h3>
      <form
        onSubmit={handleSubmit}
        className="position-relative d-flex  align-items-center flex-column w-100"
        style={{ gap: "9px", marginTop: "30px" }}
        
      >
       
          <div className="username position-relative  mt-2">
            <input
              className="iinputt p-2"
              type="text"
             value={product.title}
              onChange={(e)=>{
                setProduct({
                  ...product,
                  title:e.target.value,
                })
              }}
              required
            placeholder="Product Title"            />
            {/* <label className="lable" htmlFor="username"> */}
             {/* Product Title */}
            {/* </label> */}
          </div>
        

        <div className="email position-relative  mt-2">
          <input
             className="iinputt p-2"
            type="text"
            value={`${product.price}`}
            onChange={(e)=>{
              setProduct({
                ...product,
                price:e.target.value,
              })
            }}
            required
          placeholder="Product Price"          />
          {/* <label className="lable" htmlFor="text"> */}
            {/* Product Price */}
          {/* </label> */}
        </div>

        <div className="password position-relative  mt-2">
          <input
             className="iinputt p-2"
            type="text"
            value={product.productImgUrl} 
            onChange={(e)=>{
              setProduct({
                ...product,
                productImgUrl:e.target.value,
              })
            }}
            required
          placeholder="Product Url"
         />

          {/* <label className="lable" htmlFor="text"> */}
            {/* Product Url */}
          {/* </label> */}
          
          
         
        </div>
         <div className="password position-relative  mt-2">
           <select 
             value={product.category}
             onChange={(e)=>{
               setProduct({
                 ...product,
                 category:e.target.value,
               })
             }}
             className="" style={{background:"#e3e3e3",outline:"none",border:"none",padding:"10px 15px",borderRadius:"10px",width:"350px"}}>
           <option disabled>Select Product Category</option>{
          cathArr.map((val,id)=>{
            return(
              <option key={id}>
              {val.name}
              </option>
            )
          })
           }
           </select>
         </div>
         <div className="password position-relative  mt-2">
         <textarea
           value={product.description}
            onChange={(e)=>{
              setProduct({
                ...product,
                description:e.target.value,
              })
            }}
           placeholder="Product description" style={{color:"black",background:"#e3e3e3",outline:"none",padding:"10px 16px",border:"none",borderRadius:"10px",width:"350px"}}></textarea>
         </div>
        
        <button type="submit" className="btn btn-outline-danger fw-bold w-100" style={{height:"44px",borderRadius:"7px"}}>
         Add Product
        </button>
      </form>
    </div>
    </div>
    </>
  )
}
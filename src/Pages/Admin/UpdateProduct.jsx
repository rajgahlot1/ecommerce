import { useState ,useEffect} from "react"
import { useNavigate , useParams} from "react-router-dom";
import { toast} from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFirebase } from "../../Firebase";

export default function UpdateProduct(){
  const firebase = useFirebase();
  const { id } = useParams();
  console.log("id=>",id)
  
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

  // Ye code product details ko fetch karne ke liye hai
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(firebase.database, "products", id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, firebase.database]);
  
  // Ye code form submit karne par Firestore mein product ko update karega
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productRef = doc(firebase.database, 'products', id);
      await updateDoc(productRef, product);
      toast.success("Product updated successfully!");
      navigate('/ecommerce/admin-dashboard');
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to update product. Please try again.");
    }
  };
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
        Update Product
        </button>
      </form>
    </div>
    </div>
    </>
  )
}
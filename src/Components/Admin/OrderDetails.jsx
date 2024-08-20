import { useFirebase } from "../../Firebase";
import { FaIndianRupeeSign } from "react-icons/fa6";
export default function OrderDetails(){
  const firebase=useFirebase();
  const {deleteOrder}=firebase;
  const {  getAllOrder  } = firebase;
  return(
    <><div className="p-5 table_main d-flex flex-column gap-3"  style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
      <div className="d-flex justify-content-between align-item-center">
      <h4>All Order</h4>
      
      </div>
    <table className="w-100 " style={{border:"1px solid #ffd6d6"}} >
    <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Order Id</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Image</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Title</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Cathogary</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Price</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Quantity</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>TotalPrice</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Status</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Name</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Adress</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Pincode</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Phone no</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Email</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Date</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Action</th>
    </tr>

      {
        getAllOrder.map((order)=>{
          return(
           <>
             {
               order.cartItems.map((item,ind)=>{
                 const {id, title, price, productImgUrl, quantity, category}=item;
                 return(
                   <tr key={item.id}>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{ind+1}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{id}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}><img src={productImgUrl} style={{width:"40px",aspectRatio:"1"}}/></td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{title}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{category}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}><FaIndianRupeeSign size={10}/>{price}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{quantity}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}><FaIndianRupeeSign/>{price*quantity}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.status}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.addressInfo.name}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.addressInfo.address}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.addressInfo.pincode}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.addressInfo.mobilenumber}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.email}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{order.date}</td>
                       <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6",color:"red"}} onClick={()=>deleteOrder(order.id)}>Delete</td>
                   </tr>
                 )
               })
             }
             </>
          )
        })
      }
     
    </table>
      </div>
    </>
  )
}
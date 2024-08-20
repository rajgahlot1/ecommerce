import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useFirebase } from '../../Firebase';
const ProductDetails = () => {
  const firebase=useFirebase();
  const { getAllProductFunction, getAllProduct } = firebase;
  useEffect(() => {
    getAllProductFunction();
  }, []);
  const handleDelete = async (productId) => {
    await firebase.deleteProduct(productId);
    getAllProductFunction(); // Refresh the product list after deletion
  };
  const navigate= useNavigate();
  return (<>
    <div className='d-flex align-items-center justify-content-between m-2'><div><h4>All Product</h4></div>
    <Link to="/ecommerce/add-product"><div className='btn rounded m-2' style={{color:"black", background:"#ffc8dd", border:"1px solid #ef233c"}}>Add Product</div></Link></div>

    <div className='d-flex align-items-center justify-content-center pb-3'><table border="1"  style={{width:"95vw"}}>
    
    <tr style={{fontWeight:"500"}}>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Image</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>S.No</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Title</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Price</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Category</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Date</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Action</th>
        <th className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>Action</th>



    </tr>
    {getAllProduct.map((product, index) => (
    <tr key={index}>
    <td className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>
    <img src={product.productImgUrl} alt="product_img" style={{width:"40px",aspectRatio:"1",borderRadius:"3px"}}  />
    </td>
        <td className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>{index + 1}.</td>
        <td className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>{product.title}</td>
        <td className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>₹{product.price}</td>
        <td className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>{product.category}</td>
        <td className='p-sm-2  p-1' style={{border:"1px solid #403d39"}}>{product.date}</td>
        <td style={{border:"1px solid #403d39", cursor:"pointer"}} className='text-success p-sm-2  p-1' onClick={()=>navigate(`/ecommerce/update-product/${product.id}`)}>Edit</td>
        <td className='p-sm-2  p-1' style={{border:"1px solid #403d39", cursor:"pointer"}}  onClick={() => handleDelete(product.id)}>Delete</td>

    </tr>
     ))}
      </table></div>
      
      </>

  )
}

export default ProductDetails
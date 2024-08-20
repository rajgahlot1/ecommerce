import React from 'react'
import { Link } from 'react-router-dom'

const UserDetails = () => {
  return (<>
    <div className='d-flex align-items-center justify-content-between m-2'><div><h4>All User</h4></div>
    <Link to="/ecommerce/add-product"><div className='btn rounded m-2' style={{color:"black", background:"#ffc8dd", border:"1px solid #ef233c"}}>Add Product</div></Link></div>

    <div className='d-flex align-items-center justify-content-center'><table border="1"  style={{width:"95vw"}}>
    <tr style={{fontWeight:"500"}}>
        <th className='p-2' style={{border:"1px solid #403d39"}}>S.No</th>
        <th className='p-2' style={{border:"1px solid #403d39"}}>Location Name</th>
        <th className='p-2' style={{border:"1px solid #403d39"}}>Action</th>
        <th className='p-2' style={{border:"1px solid #403d39"}}>Action</th>
    </tr>
    <tr>
        <td className='p-2' style={{border:"1px solid #403d39"}}>1.</td>
        <td className='p-2' style={{border:"1px solid #403d39"}}>Name</td>
        <td style={{border:"1px solid #403d39"}} className='text-success p-2'>Edit</td>
        <td className='p-2' style={{border:"1px solid #403d39"}}>Delete</td>

    </tr>
      </table></div>
      
      </>

  )
}

export default UserDetails
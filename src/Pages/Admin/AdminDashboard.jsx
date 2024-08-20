import React, { useState ,useEffect} from 'react'
import { FaBasketShopping } from "react-icons/fa6";
import ProductDetails from '../../Components/Admin/ProductDetails';
import { FaListOl } from "react-icons/fa6";
import OrderDetails from '../../Components/Admin/OrderDetails';
import UserDetails from '../../Components/Admin/UserDetails';
import { FiUsers } from "react-icons/fi";
// import { Link } from 'react-router-dom';
import img from '../../imgs/img1.png'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useFirebase } from '../../Firebase';
const AdminDashboard = () => {
  const [user,setUser]= useState(null)
  const firebase = useFirebase()
  const {  getAllProduct  } = firebase;
  useEffect(() => {
    const data = firebase.userData;
    console.log("hhhh",data)
   setUser(data)
  }, [firebase.userData]);

  // useEffect(()=>{
  //   console.log(user)
  // },[user])
  return (
    <div style={{color:"#d62828"}} className='admin-dash'>
    <h2 className='text-center m-3 rounded p-3' style={{fontWeight:"500", border:"1px solid #ef233c", backgroundColor:"#ffc8dd"}}>Admin Dashboard</h2>
    <div className="m-4 d-flex flex-column align-items-center gap -2" style={{border:"1px solid #ef233c",borderRadius:"20px", backgroundColor:"#ffc8dd"}}>
          <div>
            <img src={img} className="rounded-circle bg-danger m-2" style={{ height: "150px", width: "150px" }} alt="" />
          </div>
          <div className="fs-5">
            <span style={{fontWeight:"500"}}>Name </span>
            <span>{user?.username}</span>
          </div>
          <div className="fs-5">
            <span  style={{fontWeight:"500"}}>Email : </span>
            <span>{user?.email}</span>
          </div>
          <div className="fs-5">
            <span  style={{fontWeight:"500"}}>Date : </span>
            <span>{user?.date}</span>
          </div>
          <div className="fs-5">
            <span  style={{fontWeight:"500"}}>Role : </span>
            <span>{user?.role}</span>
          </div>
        </div>
        <Tabs>
        <TabList className="d-flex align-items-center justify-content-evenly row m-3" style={{fontWeight:"500"}}>
      <Tab
        className="tabs d-flex flex-column align-items-center col-sm col-9 m-3 pb-2 pt-2 text-center"
        style={{borderRadius:"20px",  border:"1px solid #ef233c" }}>
        <div>
          <FaBasketShopping size={30} />
        </div>
        <div>{getAllProduct.length}</div> <div>Total Products</div>
      </Tab>
      <Tab
        className="tabs d-flex flex-column align-items-center col-sm col-9 m-3 pb-2 pt-2 text-center"
        style={{borderRadius:"20px",  border:"1px solid #ef233c"}}>
        <div>
          <FaListOl size={30} />
        </div>
        <div>10</div> <div>Total Order</div>
      </Tab>
      <Tab
        className="tabs d-flex flex-column align-items-center col-sm col-9 m-3 pb-2 pt-2 text-center"
        style={{borderRadius:"20px",  border:"1px solid #ef233c" }}>
        <div>
          <FiUsers size={30} />
        </div>
        <div>10</div> <div>Total Order</div>
      </Tab>
    </TabList>
    <TabPanel>
         <ProductDetails /> </TabPanel>
          
        <TabPanel>
          <OrderDetails/> </TabPanel>
        <TabPanel>
          <UserDetails/> </TabPanel>
    
    </Tabs>
       {/* <div className='d-flex align-items-center justify-content-center'> */}
    {/* <Tabs border="1"  style={{width:"95vw"}}>
        <TabList style={{fontWeight:"500"}}>
            <Tab className='p-2' style={{border:"1px solid #403d39"}}>S.No</Tab>
            <Tab className='p-2' style={{border:"1px solid #403d39"}}>Location Name</Tab>
            <Tab className='p-2' style={{border:"1px solid #403d39"}}>Action</Tab>
            <Tab className='p-2' style={{border:"1px solid #403d39"}}>Action</Tab>
        </TabList>
        <TabPanel>
          Product </TabPanel>
          
        <TabPanel>
          Order </TabPanel>
        <TabPanel>
          User </TabPanel>
          </Tabs>  */}
   {/* </div>  */}
   </div>
  )
}

export default AdminDashboard
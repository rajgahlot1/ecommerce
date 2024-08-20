import React from "react";
import Layout from "../Components/Layout";
import img from "../imgs/img1.png";
import product from '../imgs/product1.png'

import { useEffect ,useState} from "react";
import { useFirebase } from "../Firebase";
// import { useNavigate } from 'react-router-dom';
const UserDashboard = () => {
  const firebase= useFirebase();
const [user, setUser]= useState()

  useEffect(() => {
    const data = firebase.userData;
    // console.log("hhhh",data)
   setUser(data)
  }, [firebase.userData]);
//  console.log("helloss",user)
const handleLogout= async()=>{
 
  await firebase.logout()}
  return (
    <Layout>
      <div className="userDash" style={{height:"1000px"}}>
        <div className="mainData m-4 d-flex flex-column align-items-center gap -2" style={{borderRadius:"20px", backgroundColor:"#ffc8dd"}}>
          <div>
            <img src={img} className="rounded-circle bg-danger m-2" style={{ height: "150px", width: "150px" }} alt="" />
          </div>
          <div className="m-1">
            <span style={{fontWeight:"500"}}>Name </span>
            <span>{user?.username}</span>
          </div>
          <div className="fs-5 m-1">
            <span  style={{fontWeight:"500"}}>Email : </span>
            <span>{user?.email}</span>
          </div>
          <div className="fs-5 m-1">
            <span  style={{fontWeight:"500"}}>Date : </span>
            <span>{user?.date}</span>
          </div>
          <div className="fs-5 m-1">
            <span  style={{fontWeight:"500"}}>Role : </span>
            <span>{user?.role}</span>
          </div>
          <button className='btnn m-2' style={{height:"40px",borderRadius:"8px"}} onClick={handleLogout}> Logout</button>
        </div>
        <h3 className="m-3 ms-4">Order Details</h3>
        <div className="d-flex row m-5 ">
            <div className="col-md col-12  mb-sm-0 orderDetails" >
            <div className="m-2">
            <div  style={{fontWeight:"500"}}>Order Id </div>
            <div>#56456</div>
          </div>
            <div className="m-2">
            <div  style={{fontWeight:"500"}}>Date</div>
            <div>4 March 2024</div>
          </div>
          <div className="m-2">
            <div  style={{fontWeight:"500"}}>Total Amount </div>
            <div>₹344.34</div>
          </div>
          <div className="m-2">
            <div  style={{fontWeight:"500"}}>Order Status</div>
            <div className="text-success">Confirmed</div>
          </div>
          </div>
          <div className="col-md col-12 orderDetails2" ><div className="d-flex">
                  <div className="m-2">
                    <img
                      src={product}
                      style={{ background:"#faedcd" }}
                      alt=""
                      className="rounded-circle p-2"
                    />
                  </div>
                  <div className="w-100">
                    <div className="w-100 d-flex align-items-center justify-content-between mt-2"><h5 >Nike Air Force 1 07 LV8</h5><h6 >₹4600</h6></div>
                    <div className="d-flex gap-1 gap-sm-3">
                      <p style={{color:"#808289"}}>Orange</p>
                    </div>
                      <p style={{color:"#808289"}}>
                        x1
                      </p>
                  </div>
                </div>
                </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;

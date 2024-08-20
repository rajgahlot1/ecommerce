import React from "react";
import logo from "../imgs/logo3.png";
import { LuMail } from "react-icons/lu";
import { PiGlobeSimple } from "react-icons/pi";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer=()=>{
  return(
<div>
 {/* <div className="bg-danger row m-0">hia</div> */}
<div className="Footer_main  col-12 row m-0 mt-3  d-flex gap-5 align-items-center justify-content-center " style={{background:" #415a77",overflowX:"none"}}>
<div className="Footer_Design col-lg-6  col-sm d-flex flex-column "> 
<img src={logo} alt="logo" style={{maxWidth:'200px'}}/>
  <p style={{color:"white"}}> Discover a wide range of high-quality products at unbeatable prices. We prioritize customer satisfaction with fast shipping and excellent service. Shop smart, live better with Buy Smart.</p>
  <span className="d-flex flex-wrap gap-2">
 <a href="/"><FaInstagramSquare style={{color:"#ffe6a7",fontSize:"45px"}}/></a>
   <a href="/"><FaLinkedin style={{color:"#ffe6a7",fontSize:"45px"}}/></a>
     <a href="/"><FaSquareFacebook style={{color:"#ffe6a7",fontSize:"45px"}}/></a>
     <a href="/"><FaSquareTwitter style={{color:"#ffe6a7",fontSize:"45px"}}/></a>
  </span>
</div>
<div className="Footer_contect dalju col gap-5 position-relative p-2 ">
  <div className="Second " >
<div className="First dalju  flex-column">
  <PiGlobeSimple style={{fontSize:"40px",color:"#ffe6a7"}}/>
  <h6 className="text-white">jkjfl.com/example</h6>
</div></div>
   <div className="Second " >
  <div className="First  dalju  flex-column">
    <LuMail style={{fontSize:"40px",color:"#ffe6a7"}}/>
    <h6 className="text-white">contact@gamil.com</h6>
  </div></div>
</div>
</div>
</div>
  )
}

export default Footer;

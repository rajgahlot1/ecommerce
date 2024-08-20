import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import logo from "../imgs/logo3.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useFirebase } from "../Firebase";

import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  // const navigate = useNavigate();
  const firebase = useFirebase();
  const data = firebase.userData;
  const handleLogout = async () => {
    await firebase.logout();
  //  await firebase.changeUser();
    // navigate("/ecommerce/login");
  };
  return (
    <div className="navbar d-flex align-items-center justify-content-between">
      <div className="w-50 main1">
        <img
          className="m-1 bg-transparent w-25 img-fluid"
          src={logo}
          alt=""
          style={{ minWidth: "130px" }}
        />
      </div>
      <div className="main2  fw-medium text-primary">
        <ul className="m-0 p-0 d-flex align-items-center justify-content-around">
          
          <Link to="/ecommerce" className="text-decoration-none text-reset">
            <li className="p-1 d-none d-md-block">Home</li>
          </Link>
        <Link to="/ecommerce/allproduct" className="text-decoration-none text-reset"> <li className="p-1 d-none d-md-block">Shop</li></Link> 
          {!data ? (
            <Link
              to="/ecommerce/login"
              className="text-decoration-none text-reset"
            >
              
              <li className="p-1 d-none d-md-block ">Login</li>
            </Link>
          ) : (
            ""
          )}
          {data ? (
            // <Link
            //   to="/ecommerce/login"
            //   className="text-decoration-none text-reset"
            // >
              
              <li className="p-1 d-none d-md-block " onClick={handleLogout}>
                Logout
              </li>
            // </Link>
          ) : (
            ""
          )}
          {!data ? (
            <Link
              to="/ecommerce/login"
              className="text-decoration-none text-reset"
            >
              
              <li className="p-1 d-none d-md-block ">Sign up</li>
            </Link>
          ) : (
            ""
          )}
          {data?.role === "user" ? (
            <Link
              to="/ecommerce/user-dashboard"
              className="text-decoration-none text-reset"
            >
              
              <li className="p-1 d-none d-md-block "> {data?.username}</li>
            </Link>
          ) : (
            ""
          )}
          {data?.role === "admin" ? (
            <Link
              to="/ecommerce/admin-dashboard"
              className="text-decoration-none text-reset"
            >
              <li className="p-1 d-none d-md-block"> {data?.username}</li>
            </Link>
          ) : (
            ""
          )}
          <Link to="/ecommerce/cart">
            <li className="p-1">
              <MdOutlineShoppingBag />
            </li>
          </Link>
         
          <li className="d-none d-md-block p-1">
            <FaSearch />
          </li>
          <li
            className="p-1 ms-2 me-2 d-md-none "
            data-bs-toggle="collapse"
            data-bs-target=".listItems"
          >
            <BsThreeDotsVertical />
          </li>
        </ul>
        <div className="listItems collapse d-md-none">
          <ul
            className="m-2 p-2 d-flex flex-column  position-absolute end-0 justify-content-around text-dark "
            style={{
              zIndex: "2",
              top: "56px",
              backgroundColor: "rgba(4, 6, 25, 0.11)",
            }}
          >
          <Link to="/ecommerce" className="text-decoration-none text-reset">  <li className="p-1 mt-2">Home</li></Link>
          <Link to="/ecommerce/allproduct" className="text-decoration-none text-reset">  <li className="p-1 mt-2">Shop</li></Link>
            {data?.role === "user" ? (
              <Link to="/ecommerce/user-dashboard" className="text-decoration-none text-reset">
                
                <li className="p-1 mt-2 text-decoration-none text-reset">
                  {data?.username}
                </li>
              </Link>
            ) : (
              ""
            )}
            {data?.role === "admin" ? (
              <Link to="/ecommerce/admin-dashboard">
                <li className="p-1 mt-2">Admin</li>
              </Link>
            ) : (
              ""
            )}
            {/* {!data ? (
              <Link to="/ecommerce/login" className="text-decoration-none text-reset">
                
                <li className="p-1 mt-2">Login</li>
              </Link>
            ) : (
              ""
            )} */}
            {!data ? (
              <Link to="/ecommerce/login" className="text-decoration-none text-reset">
                <li className="p-1 mt-2">Register</li>
              </Link>
            ) : (
              ""
            )}
            {data ? (
              // <Link to="/ecommerce/login">
                <li className="p-1 mt-2" onClick={handleLogout}>
                  Logout
                </li>
              // </Link>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;

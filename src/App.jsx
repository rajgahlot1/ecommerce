import { Routes, Route } from "react-router-dom";
import Cart from "./Pages/Cart";
import AllProduct from "./Pages/AllProduct";
import UserDashboard from "./Pages/UserDashboard";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import React, { useState , useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import Home from "./Pages/Home";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import ProductInfo from "./Pages/ProductInfo";
import AddProduct from "./Pages/Admin/AddProduct";
import ProtectedRouteForUser from "./ProtectedRoute/ProtectedRouteForUser";
// import Welcome from './Components/Welcome';
import ProtectedRouteForAdmin from "./ProtectedRoute/ProtectedRouteForAdmin";
import Category from "./Pages/Category";
// import { useFirebase } from "./Firebase";
// import Login from './Components/Login'
// import Login from './Components/Login'

const RouteMain = () => {
  // const firebase = useFirebase();
  // const [loggedin, setLoggedin] = useState(false);

  // useEffect(() => {
  //   setLoggedin(firebase.isLoggedIn);
  // }, [firebase]);

  // const [showWelcomePage, setShowWelcomePage] = useState(true);
  // const handleRedirect = () => {
  //   setShowWelcomePage(false);
  // };
  return (
    <Routes>
      <Route path="/ecommerce" element={<Home />} />
      <Route path="/ecommerce/category/:categoryName" element={<Category />} />

      <Route path="/ecommerce/productinfo/:id" element={<ProductInfo />} />
      <Route path="/ecommerce/cart" element={<Cart />} />
      <Route path="/ecommerce/allproduct" element={<AllProduct />} />
      <Route path="/ecommerce/user-dashboard" element={<ProtectedRouteForUser><UserDashboard /></ProtectedRouteForUser>} />
      
        <Route path="/ecommerce/admin-dashboard" element={<ProtectedRouteForAdmin><AdminDashboard /></ProtectedRouteForAdmin>} />
      
      
        <Route path="/ecommerce/add-product" element={<ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>} />
      
      
        <Route path="/ecommerce/update-product/:id" element={<ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>} />
      
      <Route path="/ecommerce/login" element={<Login />} />
      {/* <Route path="/ecommerce" element={showWelcomePage ? <Welcome onRedirect={handleRedirect}/> : loggedin? <Home/> : <Login/> }/> */}
    </Routes>
  );
};

export default RouteMain;

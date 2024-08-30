import React, { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import warn from "../imgs/error.png";
import logo from "../imgs/logo3.png";
import shop from "../imgs/shop.png";
import google from "../imgs/google.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// indexOf
export default function Login() {
  const navigate= useNavigate()

  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data,setData]= useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const userData = await firebase.userData
      setData(userData);
    };
    fetchData();
  }, [firebase,firebase.user]);
  // const NextPage=()=>{
  //   console.log("hello",data.role)
  //   if(data.role==="user"){ navigate("/ecommerce/user-dashboard")}
  //     else{ navigate('/ecommerce/admin-dashboard')}
  // }
useEffect(() => {
  if (data) {
    const NextPage = () => {
      console.log("hello", data?.role);
      if (data?.role === "user") {
        navigate("/ecommerce/user-dashboard");
      } else {
        navigate("/ecommerce/admin-dashboard");
      }
    };
    NextPage();
  }
}, [data, navigate]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(false);
console.log(firebase.isLoggedIn)

    try {
      if (newUser) {
        const user = await firebase.signupUserWithPassEmail(email, password);
        const userId= await user.uid
        const data = await firebase.writeUserData(username,userId,email,password)
        console.log("User signed up:", data);
        // localStorage.setItem("username", username);
      } else {
        try{
          const user = await firebase.loginWithEmailAndPass(email, password);
        if(!user){
          console.log(error)
          setError(true);
          setErrorMsg(error?.message || "Invalid user crendential");
        }
        }catch{
          console.log(error)
          setError(true);
          setErrorMsg(error.message);
        }
       
        // firebase.setUser(user)
      }
    } catch (error) {
      console.log(error)
      setError(true);
      setErrorMsg(error.message);
    }
   
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="row loginpage me-2 ms-2" style={{ height: "550px" }}>
        <div
          className="col position-relative d-none d-md-block"
          style={{
            background: "radial-gradient(#ffe5ec, #ffc2d1)",
            borderRadius: "20px"
          }}
        >
          <h1 className="text-center">ꜱᴛᴀʀᴛ ꜱʜᴏᴘᴘɪɴɢ ᴡɪᴛʜ Qᴜɪᴄᴋ ʙᴜʏ</h1>
          <p className="text-center">
            Log in to Quick Buy and shop from a wide range of top-quality
            products.
          </p>
          <div
            className="mt-2"
            style={{
              borderTop: "2px solid black",
              borderRadius: "50%",
              height: "50px"
            }}
          ></div>
          <div
            style={{ height: "50%" }}
            className="w-100 d-flex align-items-center justify-content-center position-absolute start-0 bottom-0"
          >
            <img
              style={{ height: "100%" }}
              src={shop}
              className="img-fluid"
              alt=""
            />
          </div>
        </div>

        <div
          className="col text-center position-relative ms-2"
          style={{
            background: "radial-gradient(#ffe5ec, #ffc2d1)",
            borderRadius: "20px"
          }}
        >
          <div>
            <img
              src={logo}
              style={{ height: "100px" }}
              className="img-fluid"
              alt=""
            />
          </div>
          <h3>Welcome Back</h3>
          <form onSubmit={handleSubmit} action="" className="d-flex flex-column">
            {newUser && (
              <div className="position-relative logindata">
                <label
                  htmlFor="username"
                  className={`position-absolute ${
                    username.length > 0 ? "move" : ""
                  }`}
                >
                  Username
                </label>
                <input
                  autoComplete="off"
                  className="m-2 rounded-pill p-2 pb-0 ps-3 w-75"
                  style={{ height: "50px", outline: "none" }}
                  type="text"
                  id="username"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="position-relative logindata">
              <label
                htmlFor="email"
                className={`position-absolute ${
                  email.length > 0 ? "move" : ""
                }`}
              >
                Email
              </label>
              <input
                className="m-2 rounded-pill p-2 pb-0 ps-3 w-75"
                style={{ height: "50px", outline: "none" }}
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="position-relative logindata">
              <label
                htmlFor="password"
                className={`position-absolute ${
                  password.length > 0 ? "move" : ""
                }`}
              >
                Password
              </label>
              <input
                className="m-2 rounded-pill p-2 pb-0 ps-3 w-75"
                style={{ height: "50px", outline: "none" }}
                type="password"
                id="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center m-2">
              <Button
                className="w-75  rounded-pill"
                type="submit"
                style={{ width: "200px" }}
              >
                {newUser ? "Sign Up" : "Login"}
              </Button>
            </div>
          </form>
          <div className="p-4 position-relative d-flex flex-column align-items-center justify-content-center">
            <div style={{ border: "1px solid black", width: "90%" }}></div>
            <span
              className="position-absolute bg-light fw-medium p-1"
              style={{ borderRadius: "10px" }}
            >
              Or login with
            </span>
          </div>
          {error && (
            <>
              <img
                src={warn}
                alt="Warning"
                style={{
                  width: "50px",
                  animation: "show 0.5s ease forwards"
                }}
              />
              <div
                style={{
                  fontSize: "12px",
                  margin: "0 auto",
                  color: "red",
                  textAlign: "center"
                }}
              >
                Process Failed
              </div>
              <div
                style={{
                  fontSize: "12px",
                  margin: "0 auto",
                  color: "red",
                  textAlign: "center"
                }}
              >
                {errorMsg}
              </div>
            </>
          )}
          <div className="d-flex align-items-center mt-1 justify-content-evenly">
            <div
              className="rounded-pill"
              onClick={firebase.SignInWithGoogle}
              style={{ background: "#a6a7a7", width: "130px" ,cursor:"pointer"}}
            >
              <img
                src={google}
                alt=""
                style={{ height: "40px", padding: "7px" }}
              />
              <span className="p-2 fw-medium">Google</span>
            </div>
          </div>
         {newUser? <div
            className="fw-light p-2 text-center w-100"
            style={{ fontFamily: "-moz-initial" }}
          >
            Already have an account?
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setNewUser(false);
                setError(false);
              }}
            >
              Login
            </span>
          </div>: 
          <div
          className="fw-light p-2 text-center w-100"
          style={{ fontFamily: "-moz-initial" }}
        >
          Don't have an account?
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setNewUser(true);
              setError(false);}}
          >
            Register
          </span>
        </div>}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useFirebase } from "../Firebase";
import { useNavigate } from 'react-router-dom';

const ProtectedRouteForAdmin = ({ children }) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (firebase.userData) {
        // If user data is available, check if the user is an admin
        if (firebase.userData.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          navigate("/ecommerce/login"); // Redirect if not an admin
        }
      } else {
        // Handle case where user data is not yet available
        setIsAdmin(false);
        navigate("/ecommerce/login");
      }
    };
    checkAdminRole();
  }, [firebase.userData, navigate]);
  // Show a loading state while determining if the user is an admin
  if (isAdmin === null) {
    return <div>Loading...</div>;
  }
  // If the user is an admin, render the children components; otherwise, render nothing
  return isAdmin ? children : null;
};

export default ProtectedRouteForAdmin;

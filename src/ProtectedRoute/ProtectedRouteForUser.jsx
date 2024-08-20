import { useFirebase } from "../Firebase";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const ProtectedRouteForUser = ({ children }) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const data = firebase.userData;
      if (data && data.role === "user") {
        setIsUser(true);
      } else {
        setIsUser(false);
        navigate("/ecommerce/login"); // Redirect to login if not a user
      }
    };

    checkUserRole();
  }, [firebase.userData, navigate]);

  // Show a loading state while determining if the user has the "user" role
  if (isUser === null) {
    return <div>Loading...</div>;
  }

  // If the user has the "user" role, render the children components; otherwise, render nothing
  return isUser ? children : null;
};

export default ProtectedRouteForUser;

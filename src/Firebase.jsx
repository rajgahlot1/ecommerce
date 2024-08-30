
import React, { createContext, useContext, useState, useEffect } from "react";
// import {} from 'firebase/messaging'
import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    deleteDoc,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAG2hrNq89YtTqa054NFmE4NkgE0trUOxY",
  authDomain: "ecommerce-73a90.firebaseapp.com",
  projectId: "ecommerce-73a90",
  storageBucket: "ecommerce-73a90.appspot.com",
  messagingSenderId: "1056029288628",
  appId: "1:1056029288628:web:ede4ca5730d7476da50fe1",
  measurementId: "G-XMJ4WJ7551"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getFirestore(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [getAllProduct, setgetAllProduct] = useState([]);
  const [getAllOrder, setgetAllOrder] = useState([]);
  const [user, setUser] = useState(null);
  console.log("user",user);
  const [userData, setUserData] = useState(null);
  const [getAllUser,setgetAllUser]=useState([]);
   const [myId,setmyId]=useState() 
  
    // console.log("get",getAllUser)
  const isLoggedIn = !!user;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser); // Set the current user (if any)
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  
  // Function to add product to the user's cart
  const addToCart = async (product) => {
    if (user) {
      const cartRef = doc(database, `users/${user.uid}/cartItems/${product.id}`);

      try {
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
          // If the product is already in the cart, update the quantity
          await setDoc(cartRef, {
            ...cartDoc.data(),
            quantity: cartDoc.data().quantity + 1,
          }, { merge: true });
        } else {
          // If the product is not in the cart, add it with quantity 1
          await setDoc(cartRef, {
            category:product.category,
            description:product.description,
            date:product.date,
            time:product.time,
            id: product.id,
            title: product.title,
            price: product.price,
            productImgUrl: product.productImgUrl,
            quantity: 1,
          });
        }

        console.log("Product added to cart successfully.");
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      console.log("User not logged in.");
    }
  };

  // Remove from Cart Functionality
  const removeFromCart = async (productId) => {
    if (user) {
      const cartRef = doc(database, `users/${user.uid}/cartItems/${productId}`);

      try {
        await deleteDoc(cartRef);
        console.log(`Product with ID: ${productId} has been removed from the cart.`);
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    } else {
      console.log("User not logged in.");
    }
  };

  // Get Cart Items Count Function
  const getCartItemCount = async () => {
    if (user) {
      const cartRef = collection(database, `users/${user.uid}/cartItems`);
      const cartSnapshot = await getDocs(cartRef);
      return cartSnapshot.size; // Returns the number of documents in the collection
    }
    return 0;
  };

  // Fetch Cart Data
  const fetchCartData = async () => {
    if (user) {
      const cartRef = collection(database, `users/${user.uid}/cartItems`);
      const cartSnapshot = await getDocs(cartRef);
      const cartItems = cartSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return cartItems;
    }
    return [];
  };

  
  // get all user function
  const getAllUserFunction = () => {
    try{
      const q = query(
        collection(database, "users"),
        orderBy('time') // Assuming 'time' field exists in the user documents
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setgetAllUser(userArray);
        // setLoading(false);
      });
      return () => unsubscribe(); // Clean up subscription on unmount
    } catch (error) {
      console.error("Error fetching users: ", error);
      // setLoading(false);
    }
  };
  // getproduct with id
  const getProductById = async (id) => {
    const productRef = doc(database, "products", id); // 'doc' ko sahi tarike se use karo
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      return productDoc.data();
    } else {
      console.log("No such product!");
      return null;
    }
  };
  // GetAllOrder
  const getAllOrderFunction = async () => {
    try {
      const orderCollection = collection(database, "orders");
      const orderSnapshot = await getDocs(orderCollection);
      const ordertList = orderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setgetAllOrder(ordertList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
 
  // GetAllProduct
  const getAllProductFunction = async () => {
    try {
      const productCollection = collection(database, "products");
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setgetAllProduct(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
  useEffect(() => {
    getAllOrderFunction();// Component mount hone par products fetch karein
    getAllUserFunction();
    getAllProductFunction();
  }, []);
 
  

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      const productRef = doc(database, "products", productId);
      await deleteDoc(productRef);
      console.log(`Product with ID: ${productId} has been deleted.`);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };
  // Delete order
  const deleteOrder = async (id) => {
    try {
      const orderRef = doc(database, "orders", id);
      await deleteDoc(orderRef);
      getAllOrderFunction();
      console.log(`Product with ID: ${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  // RGISTER
 
  const signupUserWithPassEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      setUser(userCredential.user); // Store user data in the state

      console.log("User signed up:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  
  // LOGIN
  const loginWithEmailAndPass = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      setUser(userCredential.user); // Store user data in the state
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

 

  // Google login
  const SignInWithGoogle = () => signInWithPopup(firebaseAuth, GoogleProvider);
  // log out
  const logout = async () => {
    
    try {
       // Clear myId from Redux
        setUser(null);
        setUserData(null);
        console.log("User logged out");
        await signOut(firebaseAuth);
    } catch (error) {
        console.error("Error during logout: ", error);
    }
  };

  // Write user data to Firestore
  const writeUserData = async (username, userId, email, password) => {
    try {
      const userRef = doc(database, "users", userId);
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const userData = {
        username: username,
        userId: userId,
        password: password,
        email: email,
        date: new Date().toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: time,
        role: "user", // or assign role based on your requirement
      };
      await setDoc(userRef, userData);
      return userData; // Return the user data or some confirmation message
    } catch (error) {
      console.error("Error writing user data: ", error);
      throw error; // Throw error to handle it outside the function if needed
    }
  };

  // get userdata
  async function getUserData(userId) {
    try {
      const userRef = doc(database, "users", userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        // setUserData(userData); // Set the fetched data into the state

        return userData;
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      throw error;
    }
  }
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // indexOf
          const data = await getUserData(user.uid); // Fetch user data using the user's UID
         setmyId(data.userId)
          setUserData(data); // Set the fetched data into the state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]); // Re-run effect when user or getUserData changes

  return (
    <FirebaseContext.Provider
      value={{
        user,
        writeUserData,
        signupUserWithPassEmail,
        loginWithEmailAndPass,
        myId,
        isLoggedIn,
        logout,
        SignInWithGoogle,
        userData,
        getUserData,
        database,
        getAllProduct,
        getAllProductFunction,
        deleteProduct,
        getProductById,
        getAllOrder,
        getAllOrderFunction,
        deleteOrder,
        getAllUserFunction,
        getAllUser,
        addToCart,
        removeFromCart,
        getCartItemCount,
        fetchCartData
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};






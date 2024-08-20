import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from "firebase/auth";

import { getFirestore, doc, getDoc ,setDoc,getDocs,collection,deleteDoc } from "firebase/firestore"; 
const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyAhBD1KUTsvU9jDNhp2sbRnQv4qFb98qLI",
  authDomain: "mywebsite-fc538.firebaseapp.com",
  projectId: "mywebsite-fc538",
  storageBucket: "mywebsite-fc538.appspot.com",
  messagingSenderId: "1022410542049",
  appId: "1:1022410542049:web:d199d0b9199c21d5c2a0a0",
  measurementId: "G-8EDLV6RGX7"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();
export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [getAllProduct,setgetAllProduct]=useState([]);
  const isLoggedIn = !!user;
  const [getAllOrder, setgetAllOrder] = useState([]);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
    setUser(currentUser); // Set the current user (if any)
  });
  return () => unsubscribe(); // Clean up subscription on unmount
}, []);

  const signupUserWithPassEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      setUser(userCredential.user); // Store user data in the state

      console.log('User signed up:', userCredential.user);
    return userCredential.user
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  
  const loginWithEmailAndPass = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      setUser(userCredential.user); // Store user data in the state
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const productRef = doc(database, "products", productId);
      await deleteDoc(productRef);
      console.log(`Product with ID: ${productId} has been deleted.`);
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };
  const logout =async () => {
    setUser(null);
    setUserData(null)
    console.log("hello log")
    return await signOut(firebaseAuth);
  };
  const getAllProductFunction=async()=>{
    try {
      const productCollection = collection(database, "products");
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setgetAllProduct(productList);
    } catch (error) {
       console.error("Error fetching products: ", error);
    }
    }
  const now = new Date(); 
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const role = "user";
    async function writeUserData(username, userId, email, password) { 
      try {
        const userRef = doc(database, 'users', userId);
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
          role: role,
        };
        await setDoc(userRef, userData);
        return userData; // Return the user data or some confirmation message
      } catch (error) {
        console.error("Error writing user data: ", error);
        throw error; // Throw error to handle it outside the function if needed
      } 
    }
   
    
    async function getUserData(userId) {
      try {
        const userRef = doc(database, 'users', userId);
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
            setUserData(data); // Set the fetched data into the state      
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };
      fetchUserData();
    }, [user]); // Re-run effect when `user` or `getUserData` changes
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
    useEffect(() => {
      getAllOrderFunction(); // Component mount hone par products fetch karein
    }, []);
    const SignInWithGoogle = () => signInWithPopup(firebaseAuth, GoogleProvider);
  return (
    <FirebaseContext.Provider
      value={{userData,
        getUserData,
        writeUserData,
        signupUserWithPassEmail,
        loginWithEmailAndPass,
        isLoggedIn,
        SignInWithGoogle,
        deleteProduct,
        logout,
        database,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

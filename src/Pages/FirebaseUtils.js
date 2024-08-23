import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, addDoc } from "firebase/firestore";

export const fetchUserCartItems = async (db, userId) => {
  try {
    const docRef = doc(db, "users", userId, "cart", "items");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().cartItems || [] : [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const saveCartToFirestore = async (db, userId, cartItems) => {
  try {
    const docRef = doc(db, "users", userId, "cart", "items");
    await setDoc(docRef, { cartItems }, { merge: true });
  } catch (error) {
    console.error("Error saving cart to Firestore:", error);
    throw error;
  }
};

export const deleteCartItem = async (db, userId, item) => {
  try {
    const docRef = doc(db, "users", userId, "cart", "items");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const updatedCartItems = docSnap.data().cartItems.filter(cartItem => cartItem.id !== item.id);
      await setDoc(docRef, { cartItems: updatedCartItems }, { merge: true });
    }
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

export const createOrder = async (db, orderData) => {
  try {
    const ordersCollection = collection(db, "orders");
    await addDoc(ordersCollection, orderData);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const modifyCart = async (db, userId, product, action) => {
  try {
    const docRef = doc(db, "users", userId, "cart", "items");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let cartItems = docSnap.data().cartItems || [];
      if (action === 'add') {
        cartItems = [...cartItems, product];
      } else if (action === 'remove') {
        cartItems = cartItems.filter(item => item.id !== product.id);
      }
      await setDoc(docRef, { cartItems }, { merge: true });
    }
  } catch (error) {
    console.error("Error modifying cart:", error);
    throw error;
  }
};

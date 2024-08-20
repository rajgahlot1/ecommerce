// firebaseUtils.js

import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc, collection, setDoc as setCollectionDoc } from 'firebase/firestore';

// Function to fetch user cart items from Firestore
export const fetchUserCartItems = async (database, userId) => {
  const userCartRef = doc(database, 'users', userId, "cart1", "cartItems");
  const userDoc = await getDoc(userCartRef);
  return userDoc.exists() ? userDoc.data().cart || [] : [];
};

// Function to modify cart (add or remove items)
export const modifyCart = async (database, userId, product, action) => {
    const userCartRef = doc(database, 'users', userId, "cart1", "cartItems");
    try {
      const cartDoc = await getDoc(userCartRef);
      if (!cartDoc.exists()) await setDoc(userCartRef, { cart: [] });
      const updateMethod = action === 'add' ? arrayUnion : arrayRemove;
      await updateDoc(userCartRef, { cart: updateMethod({ ...product, quantity: 1 }) });
      console.log(`Product ${action === 'add' ? 'added to' : 'removed from'} cart successfully!`);
    } catch (error) {
      console.error(`Error ${action === 'add' ? 'adding to' : 'removing from'} cart:`, error);
    }
  };
  

// Function to save cart to Firestore
export const saveCartToFirestore = async (database, userId, cartItems) => {
  const cartRef = doc(database, 'users', userId, "cart1", "cartItems");
  await updateDoc(cartRef, { cartItems });
  console.log("Cart updated in Firestore");
};

// Function to delete an item from the cart in Firestore
export const deleteCartItem = async (database, userId, item) => {
  const cartRef = doc(database, 'users', userId, "cart1", "cartItems");
  const cartDoc = await getDoc(cartRef);
  if (cartDoc.exists()) {
    const updatedCartItems = cartDoc.data().cart.filter(cartItem => cartItem.productId !== item.id);
    await updateDoc(cartRef, { cart: updatedCartItems });
    console.log("Delete success: Cart updated in Firestore");
  }
};

// Function to create a new order
export const createOrder = async (database, orderData) => {
  try {
    const orderRef = collection(database, 'orders');
    await setCollectionDoc(orderRef, orderData);
    console.log("Success: Order added");
  } catch (error) {
    console.error("Error adding order: ", error);
  }
};

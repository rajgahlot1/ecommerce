

import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // Default initial state

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setInitialState(state, action) {
            return action.payload; // Set initial state with data from Firestore or another source
        },
       
        deleteFromCart(state, action) {
            return state.filter((item) => item.id !== action.payload.id); // Remove item from cart
        },
        addToCart(state, action) {
          const item = state.find((i) => i.id === action.payload.id);
          if (item) {
            item.quanity += 1;
          } else {
            state.push({ ...action.payload, quanity: 1 });
          }
        },
        incrementQuantity(state, action) {
          const item = state.find((i) => i.id === action.payload);
          if (item) {
            item.quanity += 1;
          }
        },
        decrementQuantity(state, action) {
          const item = state.find((i) => i.id === action.payload);
          if (item && item.quanity > 1) {
            item.quanity -= 1;
          }
        },
    },
});

export const {
    setInitialState,
    addToCart,
    deleteFromCart,
    incrementQuantity,
    decrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;




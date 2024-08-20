import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
            // Optionally sync with Firestore here
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
            // Optionally sync with Firestore here
        },
        incrementQuantity(state, action) {
            return state.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
            // Optionally sync with Firestore here
        },
        decrementQuantity(state, action) {
            return state.map(item => {
                if (item.id === action.payload && item.quantity > 1) {
                    item.quantity--;
                }
                return item;
            });
            // Optionally sync with Firestore here
        },
        setCart(state, action) {
            return action.payload;
            // Optionally sync with Firestore here
        },
    },
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, setCart } = CartSlice.actions;

export default CartSlice.reducer;

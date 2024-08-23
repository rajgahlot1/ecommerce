import { createSlice } from "@reduxjs/toolkit";

const initialState = null; // Initially, myId is null

export const MyIdSlice = createSlice({
    name: "myId",
    initialState,
    reducers: {
        setMyId(state, action) {
            return action.payload;
        },
        clearMyId(state) {
            return null; // Clear the myId
        },
    },
});

export const { setMyId,clearMyId } = MyIdSlice.actions;

export default MyIdSlice.reducer;

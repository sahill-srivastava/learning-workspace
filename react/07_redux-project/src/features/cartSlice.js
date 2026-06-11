import { createSlice } from "@reduxjs/toolkit";

// createSlice fn takes configurations: name, initialState, reducers
// reducers takes an action such as addCartItem, removeCartItem

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addCartItem: (state, action) => {
            state.items.push(action.payload)
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            state.items.length = 0;
        }
    }
})


// we export 2 things from here: actions and reducers

export const {
    addCartItem,
    removeItem,
    clearCart
} = cartSlice.actions


export default cartSlice.reducer;


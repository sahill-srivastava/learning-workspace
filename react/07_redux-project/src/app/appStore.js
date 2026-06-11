import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice"

// it holds different different slices and behave like main global container

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
    }
});


export default appStore;
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // state.cart === { items: [] }
    auth: authReducer,
    // user: userReducer  // state.user === { xx, xx }
  },
});

export default store;

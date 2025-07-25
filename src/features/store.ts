import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Load cart from sessionStorage
const loadCartFromSession = () => {
  try {
    const data = sessionStorage.getItem('cart');
    return data ? JSON.parse(data) : undefined;
  } catch (err) {
    console.error('Error loading cart from sessionStorage', err);
    return undefined;
  }
};

const preloadedState = {
  cart: {
    items: loadCartFromSession() || [],
  },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Save cart to sessionStorage whenever the store changes
store.subscribe(() => {
  try {
    const state = store.getState();
    sessionStorage.setItem('cart', JSON.stringify(state.cart.items));
  } catch (err) {
    console.error('Error saving cart to sessionStorage', err);
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

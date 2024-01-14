import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import productsSlice from './reducers/productsSlice';
import basketSlice from './reducers/basketSlice';

const rememberedKeys = [ 'auth', 'products', 'basket' ];

const store = configureStore({

  reducer: rememberReducer({ 

    auth: authSlice,
    products: productsSlice,
    basket: basketSlice

  }),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage,
      rememberedKeys
    )
  )
})

export default store






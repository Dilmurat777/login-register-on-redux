import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import { rememberReducer, rememberEnhancer } from 'redux-remember';

const rememberedKeys = [ 'auth' ];

const store = configureStore({
  reducer: rememberReducer({ 
    auth: authSlice
  }),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage, // or window.sessionStorage, or AsyncStorage, or your own custom storage driver
      rememberedKeys
    )
  )
})

export default store






import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userReducer from './user'
import productReducer from './products'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer
    },
})

export default store
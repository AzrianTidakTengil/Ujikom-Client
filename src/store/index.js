import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userReducer from './user'
import productReducer from './products'
import trolleyReducer from './trolley'
import transactionReducer from './transaction'
import addressReducer from './address'
import shopReducer from './shop'
import regionReducer from './region'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        trolley: trolleyReducer,
        transaction: transactionReducer,
        address: addressReducer,
        shop: shopReducer,
        region: regionReducer,
    },
})

export default store
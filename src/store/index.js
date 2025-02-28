import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userReducer from './user'
import productReducer from './products'
import trolleyReducer from './trolley'
import transactionReducer from './transaction'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        trolley: trolleyReducer,
        transaction: transactionReducer
    },
})

export default store
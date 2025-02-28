import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "@/services";

export const createTransaction = createAsyncThunk('transactionSlice/createTransaction', async (params) => {
    const response = Transaction.create(params)
    return response
})

export const getTransaction = createAsyncThunk('transactionSlice/getTransaction', async (params) => {
    const response = await Transaction.getOne(params)
    return response
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: null,
    data: {}
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload.data
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getTransaction.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload.data
            })
            .addCase(getTransaction.rejected, (state, action) => {
                state.isLoading = true
                state.error = action.error.message
            })
    }
})
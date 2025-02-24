import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/services";

export const getAll = createAsyncThunk('productSlice/getAll', async () => {
    const response = await Product.ALl()
    return response.data
})

export const getOne = createAsyncThunk('productSlice/getOne', async () => {
    const response = await Product.One()
    return response.data
})

export const findProduct = createAsyncThunk('productSlice/findProduct', async () => {
    const response = await Product.Find()
    return response.data
})

const initialState = {
    isLoading: false,
    error: null,
    show: [],
    data: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.show = action.payload.data
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getOne.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.isLoading = false,
                state.data = action.payload.data
            })
            .addCase(getOne.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(findProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(findProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.show = action.payload.data
            }).addCase(findProduct.pending, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default productSlice.reducer
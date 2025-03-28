import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/services";

export const getAll = createAsyncThunk('productSlice/getAll', async (params) => {
    const response = await Product.ALl(params)
    return response.data
})

export const getOne = createAsyncThunk('productSlice/getOne', async (params) => {
    const response = await Product.One(params)
    return response.data
})

export const findProduct = createAsyncThunk('productSlice/findProduct', async () => {
    const response = await Product.Find()
    return response.data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: null,
    show: [],
    totalItems: 0,
    data: {
        isLoading: false,
        isSuccess: false,
        product: {
            id: null,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            shop: {
                id: null,
                name: '',
                address: ''
            }
        }
    }
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
                state.isSuccess = false
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.show = action.payload.data
                state.totalItems = action.payload.total_products
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getOne.pending, (state) => {
                state.data.isLoading = true
                state.data.isSuccess = false
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.data.isLoading = false
                state.data.isSuccess = true
                state.data.product.id = action.payload.data.id
                state.data.product.name = action.payload.data.name
                state.data.product.description = action.payload.data.description
                state.data.product.price = action.payload.data.price
                state.data.product.stock = action.payload.data.stock
                state.data.product.shop.id = action.payload.data.productToOwner.ownerToStore.id
                state.data.product.shop.name = action.payload.data.productToOwner.ownerToStore.name
                state.data.product.shop.address = action.payload.data.productToOwner.ownerToStore.address
            })
            .addCase(getOne.rejected, (state, action) => {
                state.data.isLoading = false
                state.error = action.error.message
            })
            .addCase(findProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(findProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.show = action.payload.data
            }).addCase(findProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default productSlice.reducer
import { Balance, BySeller, InTrolley, Operaion, PopularAnalysis, ProductShop, UpdateShop } from "@/services/shop";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeller = createAsyncThunk('shopSlice/getSeller', async (params) => {
    const response = await BySeller()
    return response.data
})

export const UpdateShopInformation = createAsyncThunk('shopSlice/UpdateShopInformation', async (params) => {
    const response = await UpdateShop(params)
    return response.data
})

export const BalanceInformation = createAsyncThunk('shopSlice/BalanceInformation', async (params) => {
    const response = await Balance()
    return response.data
})

export const MyProductInTrolley = createAsyncThunk('shopSlice/MyProductInTrolley', async (params) => {
    const response = await InTrolley()
    return response.data
})

export const Order = createAsyncThunk('shopSlice/Order', async (params) => {
    const response = await Operaion()
    return response.data
})

export const MyProductShop = createAsyncThunk('shopSlice/MyProductShop', async (params) => {
    const response = await ProductShop()
    return response.data
})

export const PopularAnalysisProduct = createAsyncThunk('shopSlice/PopularAnalysisProduct', async (params) => {
    const response = await PopularAnalysis()
    return response.data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    seller: {},
    balanceInformation: {
        balance: null,
        history: []
    },
    LengthProductInTrolley: 0,
    order: [],
    product: [],
    popularProduct: [],
    error: null
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSeller.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getSeller.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.seller = action.payload.data
            })
            .addCase(getSeller.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(UpdateShopInformation.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(UpdateShopInformation.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = false
            })
            .addCase(UpdateShopInformation.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(BalanceInformation.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(BalanceInformation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.balanceInformation.balance = action.payload.data.balance
                state.balanceInformation.history = action.payload.data.transaction
            })
            .addCase(BalanceInformation.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(MyProductInTrolley.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(MyProductInTrolley.fulfilled, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.LengthProductInTrolley = action.payload.data.count
            })
            .addCase(MyProductInTrolley.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(Order.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(Order.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.order = action.payload.data
            })
            .addCase(Order.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(MyProductShop.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(MyProductShop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.product = action.payload.data
            })
            .addCase(MyProductShop.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(PopularAnalysisProduct.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(PopularAnalysisProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.popularProduct = action.payload.data
            })
            .addCase(PopularAnalysisProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default shopSlice.reducer
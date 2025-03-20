import { Balance, BySeller, InTrolley, Operaion, PopularAnalysis, ProductShop, UpdateShop, Order as OrderShop, HandleOrdering } from "@/services/shop";
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
    const response = await OrderShop(params)
    return response.data
})

export const MyProductShop = createAsyncThunk('shopSlice/MyProductShop', async (params) => {
    const response = await ProductShop(params)
    return response.data
})

export const PopularAnalysisProduct = createAsyncThunk('shopSlice/PopularAnalysisProduct', async (params) => {
    const response = await PopularAnalysis()
    return response.data
})

export const HandleOrderTransaction = createAsyncThunk('shopSlice/HandleOrderTransaction', async (params) => {
    const response = await HandleOrdering(params)
    return response.data
})

export const OperationShop = createAsyncThunk('shopSlice/OperationShop', async (params) => {
    const response = await Operaion()
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
    orderTabel: {
        data: [],
        lenght: 0,
    },
    lengthOrderUnProccess: 0,
    product: [],
    lengthProduct: 0,
    popularProduct: [],
    operation: [],
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
                state.isLoading = false
                state.isSuccess = true
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
                state.orderTabel.data = action.payload.data.transaction
                state.orderTabel.lenght = action.payload.data.length_order_process
                state.lengthOrderUnProccess = action.payload.data.length_order_process
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
                state.product = action.payload.data.product
                state.lengthProduct = action.payload.data.length_product
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
            .addCase(HandleOrderTransaction.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(HandleOrderTransaction.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(HandleOrderTransaction.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(OperationShop.pending, (state) => {
                state.isLoading = true,
                state.isSuccess = false
            })
            .addCase(OperationShop.rejected, (state, action) => {
                state.isLoading = false,
                state.error = action.error.message
            })
            .addCase(OperationShop.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.operation = action.payload.data
            })
    }
})

export default shopSlice.reducer
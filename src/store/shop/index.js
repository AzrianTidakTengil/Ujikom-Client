import { BySeller } from "@/services/shop";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSeller = createAsyncThunk('shopSlice/getSeller', async (params) => {
    const response = await BySeller()
    return response.data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    seller: {},
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
    }
})

export default shopSlice.reducer
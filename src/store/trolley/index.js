import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Trolley } from "@/services";

export const insertItem = createAsyncThunk('trolleySlice/insertItem',  async (params) => {
    const response = await Trolley.insert(params)
    return response.data
})

export const getAllItemTrolley = createAsyncThunk('trolleySlice/getAllItemTrolley', async (params) => {
    const response = await Trolley.list()
    return response.data
})

const initialState = {
    isLoading: false,
    isSucces: false,
    error: null,
    data: []
}

export const trolleySlice = createSlice({
    name: 'trolley',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(insertItem.pending, (state) => {
                state.isLoading = true
                state.isSucces = false
            })
            .addCase(insertItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
            })
            .addCase(insertItem.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getAllItemTrolley.pending, (state) => {
                state.isLoading = true
                state.isSucces = false
            })
            .addCase(getAllItemTrolley.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucces = true
                state.data = action.payload.data
            }).addCase(getAllItemTrolley.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default trolleySlice.reducer
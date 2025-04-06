import { KeywordProductCreate, KeywordProductDelete, KeywordProductFind } from "@/services/keyword";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import KeywordMessage from './message'

export const KeywordCreate = createAsyncThunk('keywordSlice/KeywordCreate', async (params) => {
    const response = await KeywordProductCreate(params)
    return response.data
})

export const KeywordFind = createAsyncThunk('keywordSlice/KeywordFind', async (params) => {
    const response = await KeywordProductFind(params)
    return response.data
})

export const KeywordDelete = createAsyncThunk('keywordSlice/KeywordDelete', async (params) => {
    const response = await KeywordProductDelete(params)
    return response.data
})

const initialState = {
    isLoading: false,
    error: null,
    message: '',
    isSuccess: false,
    data: []
}

export const keywordSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(KeywordCreate.pending, (state, action) => {
                state.message = KeywordMessage.KEYWORD.PRODUCT.CREATE
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(KeywordCreate.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(KeywordCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(KeywordDelete.pending, (state, action) => {
                state.message = KeywordMessage.KEYWORD.PRODUCT.DELETE
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(KeywordDelete.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(KeywordDelete.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(KeywordFind.pending, (state, action) => {
                state.message = KeywordMessage.KEYWORD.PRODUCT.GET
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(KeywordFind.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(KeywordFind.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload.data
            })
    }
})

export default keywordSlice.reducer
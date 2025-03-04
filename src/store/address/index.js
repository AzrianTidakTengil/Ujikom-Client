import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "@/services";

export const getAll = createAsyncThunk('addressSlice/all', async (params) => {
    const response = await Address.getAll()
    return response.data
})

export const getOne = createAsyncThunk('addressSlice/one', async (params) => {
    const response = await Address.getOne(params)
    return response.data
})

export const find = createAsyncThunk('addressSlice/find', async (params) => {
    const response = await Address.find(params)
    return response.data
})

export const create = createAsyncThunk('addressSlice/create', async (params) => {
    const response = await Address.create(params)
    return response.data
})

export const update = createAsyncThunk('addressSlice/update', async (params) => {
    const response = await Address.update(params)
    return response.data
})

export const destroy = createAsyncThunk('addressSlice/delete', async (params) => {
    const response = await Address.destroy(params)
    return response.data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: null,
    list: [],
    address: {}
}

export const addressSlice = createSlice({
    name: 'address',
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
                state.isSuccess = true
                state.isLoading = false
                state.list = action.payload
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

            .addCase(getOne.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.address = action.payload
            })
            .addCase(getOne.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(find.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(find.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.list = action.payload
            })
            .addCase(find.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(create.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(destroy.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(destroy.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(destroy.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})
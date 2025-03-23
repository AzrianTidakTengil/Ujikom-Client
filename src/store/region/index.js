import { City, District, Province } from "@/services/region"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import messageRegion from './message'

export const GetDistrict = createAsyncThunk('regionSlice/GetDistrict', async (params) => {
    const response = await District()
    return response.data
})

export const GetProvinces = createAsyncThunk('regionSlice/GetProvinces', async (params) => {
    const response = await Province()
    return response.data
})

export const GetCities = createAsyncThunk('regionSlice/GetCities', async (params) => {
    const response = await City(params)
    return response.data
})

const initialState = {
    isSuccess: false,
    isLoading: false,
    message: '',
    error: null,
    district: [],
    provinces: [],
    cities: [],
}

export const regionSlice = createSlice({
    name: 'region',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(GetDistrict.pending, (state) => {
            state.isLoading = true
            state.message = ''
            state.isSuccess = false
        })
        .addCase(GetDistrict.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = messageRegion.REGION.DISTRICT
            state.district = action.payload
        })
        .addCase(GetProvinces.pending, (state) => {
            state.isLoading = true
            state.message = ''
            state.isSuccess = false
        })
        .addCase(GetProvinces.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.provinces = action.payload
            state.message = messageRegion.REGION.PROVINCES
        })
        .addCase(GetCities.pending, (state) => {
            state.isLoading = true
            state.message = ''
            state.isSuccess = false
        })
        .addCase(GetCities.fulfilled, (state, action) => {
            state.cities = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.message = messageRegion.REGION.CITIES
        })
    }
})

export default regionSlice.reducer
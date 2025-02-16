import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "@/services";
import Cookie from 'js-cookie'

export const login = createAsyncThunk('authSlice/login', async (params) => {
    const response = await Auth.login(params)
    return response.data
})

const initialState = {
    isLoading: false,
    error: null,
    data: [],
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = ''
            state.error = null
            state.data = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.accessToken
                state.data = action.payload

                Cookie.set('token', action.payload.accessToken, {expires: 7})
                window.location.reload()
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message;
            })
    }
})

export const {logout} = authSlice.actions

export default authSlice.reducer
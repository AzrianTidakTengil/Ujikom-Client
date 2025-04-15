import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "@/services";
import Cookie from 'js-cookie'

export const login = createAsyncThunk('authSlice/login', async (params) => {
    const response = await Auth.login(params)
    return response.data
})

export const SendCodeOtp = createAsyncThunk('authSlice/SendCodeOtp', async (params) => {
    const response = await Auth.SendOtpToEmail(params)
    return response.data
})

export const VerifyCodeOtp = createAsyncThunk('authSlice/VerifyCodeOtp', async (params) => {
    const response = await Auth.VerifyOtpToEmail(params)
    return response.data
})

export const RegisterUser = createAsyncThunk('authSlice/RegisterUser', async (params) => {
    const response = await Auth.register(params)
    return response.data
})

export const ChangeRoleShop = createAsyncThunk('authSlice/ChangeRoleShop', async (params) => {
    const response = await Auth.PostChangeRole(params)
    return response.data
})

const initialState = {
    isLoading: false,
    error: null,
    data: [],
    token: '',
    isSuccessToken: false,
    isSuccessSend: false,
    progressIndex: 0,
    isSuccessRegister: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = ''
            state.error = null
            state.data = []

            Cookie.remove('token')
            window.location.reload()
        },
        upProgress: (state) => {
            state.progressIndex = state.progressIndex + 1
        },
        resetProgress: (state) => {
            state.progressIndex = 0
        },
        downProgress: (state) => {
            state.progressIndex = state.progressIndex - 1
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
            .addCase(SendCodeOtp.pending, (state, action) => {
                state.isLoading = true
                state.isSuccessSend = false
            })
            .addCase(SendCodeOtp.rejected, (state, action) => {
                state.isLoading = false
                state.error = {
                    credential: `Email has been registered`
                }
            })
            .addCase(SendCodeOtp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessSend = true
                state.progressIndex = 1
            })
            .addCase(VerifyCodeOtp.pending, (state, action) => {
                state.isLoading = true
                state.isSuccessToken = false
            })
            .addCase(VerifyCodeOtp.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccessToken = false
            })
            .addCase(VerifyCodeOtp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessToken = true
                state.progressIndex = 2
            })
            .addCase(RegisterUser.pending, (state, action) => {
                state.isLoading = true
                state.isSuccessRegister = false
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessRegister = true
                state.progressIndex = 4
            })
            .addCase(ChangeRoleShop.pending, (state, action) => {
                state.isLoading = true
                state.isSuccessRegister = false
            })
            .addCase(ChangeRoleShop.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(ChangeRoleShop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccessRegister = true
                state.progressIndex = 3
            })
    }
})

export const {logout, upProgress, resetProgress, downProgress} = authSlice.actions

export default authSlice.reducer
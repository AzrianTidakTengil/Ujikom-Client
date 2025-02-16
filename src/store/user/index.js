import { Users } from "@/services"
import { fabClasses } from "@mui/material"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getUser = createAsyncThunk('userSlice/get', async (params) => {
    const response = await Users.get()
    return response.data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    error: null,
    user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        telephone: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state, action) => {
            const {username, firstname, lastname, email, telephone} = action.payload.data
            state.isLoading = false
            state.user.email = email
            state.user.firstname = firstname
            state.user.lastname = lastname
            state.user.telephone = telephone
            state.user.username = username
            state.isSuccess = true
        }).addCase(getUser.rejected, (state,action) => {
            state.isLoading = false
            state.error = action.error.message
            state.isSuccess = false
        })
    }
})

export const {} = userSlice.actions
export default userSlice.reducer
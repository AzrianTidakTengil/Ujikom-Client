import { Users } from "@/services"
import { CreateOrUpadateAvatar, DeleteAvatar } from "@/services/user"
import { fabClasses } from "@mui/material"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserMessage from './message'

export const getUser = createAsyncThunk('userSlice/get', async (params) => {
    const response = await Users.get()
    return response.data
})

export const updateAvatarUser = createAsyncThunk('userSlice/UpdateAvatarUser', async (params) => {
    const response = await CreateOrUpadateAvatar(params)
    return response.data
})

export const deleteAvatarUser = createAsyncThunk('userSlice/deleteAvatarUser', async (params) => {
    const response = await DeleteAvatar()
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
        telephone: '',
        avatar: '',
    },
    message: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.message = ''
            state.isSuccess = false
            state.isLoading = true
        }).addCase(getUser.fulfilled, (state, action) => {
            const {username, firstname, lastname, email, telephone, avatar} = action.payload.data
            state.message = UserMessage.USER.GET
            state.isLoading = false
            state.user.email = email
            state.user.firstname = firstname
            state.user.lastname = lastname
            state.user.telephone = telephone
            state.user.username = username
            state.user.avatar = avatar
            state.isSuccess = true
        }).addCase(getUser.rejected, (state,action) => {
            state.message = UserMessage.USER.GET
            state.isLoading = false
            state.error = action.error.message
            state.isSuccess = false
        })
        .addCase(updateAvatarUser.pending, (state) => {
            state.message = ''
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(updateAvatarUser.fulfilled, (state, action) => {
            state.message = UserMessage.USER.AVATAR
            state.isLoading = false
            state.isSuccess = true
            
            window.location.reload()
        })
        .addCase(updateAvatarUser.rejected, (state, action) => {
            state.message = UserMessage.USER.AVATAR
            state.isLoading = false
            state.isSuccess = false
        })
        .addCase(deleteAvatarUser.pending, (state) => {
            state.message = ''
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(deleteAvatarUser.rejected, (state, action) => {
            state.message = UserMessage.USER.DELETE_AVATAR
            state.isLoading = false
            state.isSuccess = false
            state.error = action.error.message
        })
        .addCase(deleteAvatarUser.fulfilled, (state, action) => {
            state.message = UserMessage.USER.DELETE_AVATAR
            state.isLoading = false
            state.isSuccess = true

            window.location.reload()
        })
    }
})

export const {} = userSlice.actions
export default userSlice.reducer
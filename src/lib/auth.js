import { Auth } from "@/services";
import { create } from "zustand";

const LoginLib = create((set) => ({
    isLoading: false,
    error: null,
    data: null,

    post: async (params) => {
        set({isLoading: true})
        try {
            const {isLoading} = LoginLib.getState()
            const response = await Auth.login(params)
            set({data: response.data, isLoading: false})
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    }
}))

export default LoginLib
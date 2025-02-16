import axios from "axios";
import Cookie from 'js-cookie'

export const apiServiceV1 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiServiceV1.interceptors.request.use((config) => {
    const token = Cookie.get('token')

    if (token) {
        console.log('ada')
        config.headers['x-access-token'] = `Ujikom ${token}`
    }
    
    return config
}, (error) => {
    return Promise.reject(error)
})
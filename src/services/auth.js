import { endpoints, apiServiceV1 } from "@/config";

export const login = (params) => {
    return apiServiceV1.post(
        endpoints.AUTH.LOGIN,
        params
    )
}

export const register = (params) => {
    return apiServiceV1.post(
        endpoints.AUTH.REGISTER,
        params
    )
}

export const test = () => {
   return apiServiceV1.get(
        endpoints.TEST
   )
}
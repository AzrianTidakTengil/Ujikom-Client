import { endpoints, apiServiceV1 } from "@/config";

export const ALl = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.ALL,
        params
    )
}

export const One = (params) => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.GET,
        params
    )
}

export const Find = (params) => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.FIND,
        params
    )
}
import { endpoints, apiServiceV1 } from "@/config";

export const ALl = () => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.ALL
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
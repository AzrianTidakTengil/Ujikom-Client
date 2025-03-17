import { endpoints, apiServiceV1 } from "@/config";

export const BySeller = () => {
    return apiServiceV1.get(
        endpoints.STORE.SELLER
    )
}

export const UpdateShop = (params) => {
    return apiServiceV1.put(
        endpoints.STORE.UPDATE,
        params
    )
}

export const Balance = () => {
    return apiServiceV1.get(
        endpoints.STORE.BALANCE
    )
}

export const InTrolley = () => {
    return apiServiceV1.get(
        endpoints.STORE.INTROLLEY
    )
}

export const Order = () => {
    return apiServiceV1.get(
        endpoints.STORE.ORDER
    )
}

export const Operaion = () => {
    return apiServiceV1.get(
        endpoints.STORE.OPERATION
    )
}

export const ProductShop = () => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.STORE
    )
}

export const PopularAnalysis = () => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.POPULAR
    )
}
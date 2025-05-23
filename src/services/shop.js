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

export const Order = (params) => {
    return apiServiceV1.post(
        endpoints.STORE.ORDER,
        params
    )
}

export const Operaion = () => {
    return apiServiceV1.get(
        endpoints.STORE.OPERATION
    )
}

export const ProductShop = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.STORE,
        params
    )
}

export const PopularAnalysis = () => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.POPULAR
    )
}

export const HandleOrdering = (params) => {
    return apiServiceV1.post(
        endpoints.STORE.HANDLEORDER,
        params
    )
}

export const GetShopAddress = (params) => {
    return apiServiceV1.get(
        endpoints.STORE.ADDRESS.GET
    )
}

export const CreateOrUpdateShopAddress = (params) => {
    return apiServiceV1.post(
        endpoints.STORE.ADDRESS.CRETEORUPDATE,
        params
    )
}

export const FindSeller = (params) => {
    return apiServiceV1.get(
        `${endpoints.STORE.SELLER}/${params.id}`
    )
}
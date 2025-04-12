import { endpoints, apiServiceV1 } from "@/config";

export const ALl = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.ALL,
        params
    )
}

export const One = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.GET,
        params
    )
}

export const Find = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.FIND,
        params
    )
}

export const CreateProduct = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.CREATE,
        params
    )
}

export const TreeCateogories = () => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.TREECATEGORIES
    )
}

export const Variant = () => {
    return apiServiceV1.get(
        endpoints.PRODUCTS.LISTVARIANT
    )
}

export const SubVariant = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.LISTSUBVARIANT,
        params
    )
}

export const CreateVariant = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.CREATEVARIANT,
        params
    )
}

export const CreateSubVariant = (params) => {
    return apiServiceV1.post(
        endpoints.PRODUCTS.CREATESUBVARIANT,
        params
    )
}

export const GetProductShop = (params) => {
    return apiServiceV1.post(
        `${endpoints.PRODUCTS.STORE}/summary`,
        params
    )
}
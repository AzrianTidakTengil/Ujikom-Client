import { apiServiceV1, endpoints } from "@/config";

export const KeywordProductCreate = (params) => {
    return apiServiceV1.post(
        endpoints.KEYWORD.PRODUCT.CREATE,
        params
    )
}

export const KeywordProductFind = (params) => {
    return apiServiceV1.post(
        endpoints.KEYWORD.PRODUCT.GET,
        params
    )
}

export const KeywordProductDelete = (params) => {
    return apiServiceV1.delete(
        endpoints.KEYWORD.PRODUCT.DELETE,
        params
    )
}
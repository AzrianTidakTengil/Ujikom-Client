import { endpoints, apiServiceV1 } from "@/config";

export const create = (params) => {
    return apiServiceV1.post(
        endpoints.TRANSACTION.CREATE,
        params
    )
}

export const getOne = (params) => {
    return apiServiceV1.post(
        endpoints.TRANSACTION.GET,
        params
    )
}

export const getAll = (params) => {
    return apiServiceV1.post(
        endpoints.TRANSACTION.ALL,
        params
    )
}

export const find = (params) => {
    return apiServiceV1.post(
        endpoints.TRANSACTION.FIND,
        params
    )
}

export const isApprove = (params) => {
    return apiServiceV1.post(
        endpoints.TRANSACTION.ISAPPROVE,
        params
    )
}
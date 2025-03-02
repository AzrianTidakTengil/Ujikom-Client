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
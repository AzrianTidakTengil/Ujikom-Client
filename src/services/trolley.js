import { endpoints, apiServiceV1 } from "@/config";

export const insert = (params) => {
    return apiServiceV1.post(
        endpoints.TROLLEY.CREATE,
        params
    )
}

export const updateItems = (params) => {
    return apiServiceV1.put(
        endpoints.TROLLEY.UPDATE,
        params
    )
}

export const list = () => {
    return apiServiceV1.get(
        endpoints.TROLLEY.GET
    )
}

export const find = (params) => {
    return apiServiceV1.post(
        endpoints.TROLLEY.FIND,
        params
    )
}
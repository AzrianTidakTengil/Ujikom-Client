import { endpoints, apiServiceV1 } from "@/config";

export const getAll = () => {
    return apiServiceV1.get(endpoints.USER.ADDRESS.ALL)
}

export const getOne = (params) => {
    return apiServiceV1.post(
        endpoints.USER.ADDRESS.ONE,
        params
    )
}

export const find = (params) => {
    return apiServiceV1.post(
        endpoints.USER.ADDRESS.FIND,
        params
    )
}

export const create = (params) => {
    return apiServiceV1.post(
        endpoints.USER.ADDRESS.CREATE,
        params
    )
}

export const update = (params) => {
    return apiServiceV1.put(
        endpoints.USER.ADDRESS.UPDATE,
        params
    )
}

export const destroy = (params) => {
    return apiServiceV1.delete(
        endpoints.USER.ADDRESS.DELETE,
        params
    )
}
import { endpoints, apiServiceV1 } from "@/config";

export const get = () => {
    return apiServiceV1.get(
        endpoints.USER.GET,
    )
}

export const CreateOrUpadateAvatar = (params) => {
    return apiServiceV1.post(
        endpoints.USER.AVATAR,
        params
    )
}

export const DeleteAvatar = (params) => {
    return apiServiceV1.delete(
        endpoints.USER.AVATAR
    )
}
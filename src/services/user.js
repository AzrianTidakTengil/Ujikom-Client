import { endpoints, apiServiceV1 } from "@/config";

export const get = () => {
    return apiServiceV1.get(
        endpoints.USER.GET,
    )
}
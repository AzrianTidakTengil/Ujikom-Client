import { endpoints, apiServiceV1 } from "@/config";

export const BySeller = () => {
    return apiServiceV1.get(
        endpoints.STORE.SELLER
    )
}

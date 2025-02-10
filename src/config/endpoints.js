export default {
    AUTH: {
        LOGIN: '/auth/signin',
        REGISTER: '/auth/signup',
    },
    PRODUCTS: {
        ALL: '/items',
        GET: '/item',
        CREATE: '/item/create',
        UPDATE: '/item/update',
        DELETE: '/item/delete',
        MARK: '/item/mark',
    },
    TROLLEY: {
        GET: '/trolley',
        CREATE: '/trolley/create',
        UPDATE: '/trolley/update',
        DELETE: '/trolley/delete',
    },
    TRANSACTION: {
        GET: '/transaction',
        CREATE: '/transaction/create',
        DELETE: '/transaction/delete',
    },
    LABEL: {
        CREATE: '/label/create',
        ALL: '/labels',
        STORE: {
            POST: '/labels/store/create',
            UPDATE: '/labels/store/update',
            DELETE: '/labels/store/delete',
        },
        DELIVERY: {
            GET: '/labels/delivery',
            POST: '/labels/delivery/create',
            UPDATE: '/labels/delivery/update',
            DELETE: '/labels/delivery/delete',
        }
    },
    STORE: {
        CREATE: '/store/create',
        UPDATE: '/store/update',
        LABEL: {
            GET: '/store/label',
            CREATE: '/store/label/add',
            UPDATE: '/store/label/update',
        }
    },
    TEST: '/test'
}
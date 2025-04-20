export default {
    AUTH: {
        LOGIN: '/auth/signin',
        REGISTER: '/auth/signup',
        GOOGLE: '/auth/google',
        LOGOUT: '/auth/logout',
        SENDOTP: '/auth/otp',
        VERIFYOTP: '/auth/otp/verify',
        CHANGETOROLE: '/auth/openshop',
    },
    PRODUCTS: {
        ALL: '/items',
        GET: '/item',
        FIND: '/item/find',
        CREATE: '/item/create',
        UPDATE: '/item/update',
        DELETE: '/item/delete',
        MARK: '/item/mark',
        POPULAR: '/item/popular',
        STORE: '/item/store',
        LISTVARIANT: '/items/variant',
        LISTSUBVARIANT: '/items/subvariant',
        CREATEVARIANT: '/item/variant/create',
        CREATESUBVARIANT: '/item/subvariant/create',
        TREECATEGORIES: '/items/categories/tree'
    },
    TROLLEY: {
        FIND: '/trolley/find',
        GET: '/trolley',
        CREATE: '/trolley/create',
        UPDATE: '/trolley/update',
        DELETE: '/trolley/delete',
    },
    TRANSACTION: {
        GET: '/transaction',
        ALL: '/transactions',
        FIND: '/transactions/find',
        CREATE: '/transaction/create',
        DELETE: '/transaction/delete',
        ISAPPROVE: '/transaction/isapprove',
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
        SELLER: '/seller',
        CREATE: '/store/create',
        UPDATE: '/store/update',
        LABEL: {
            GET: '/store/label',
            CREATE: '/store/label/add',
            UPDATE: '/store/label/update',
        },
        BALANCE: '/store/balance',
        INTROLLEY: '/store/introlley',
        ORDER: '/store/order',
        HANDLEORDER: '/store/order/handle',
        OPERATION: '/store/operation',
        ADDRESS: {
            GET: '/store/address',
            CRETEORUPDATE: 'store/address/edit'
        },
    },
    TEST: '/test',
    USER: {
        GET: '/user',
        AVATAR: '/user/avatar',
        ADDRESS: {
            ONE: '/user/address',
            ALL: '/user/addresses',
            FIND: '/user/address/find',
            CREATE: '/user/address/create',
            UPDATE: '/user/address/update',
            DELETE: '/user/address/delete',
        }
    },
    KEYWORD: {
        PRODUCT: {
            GET: '/keyword/products',
            CREATE: '/keyword/products/find',
            DELETE: '/keyword/products/delete',
        },
    },
}
import jsCookie from "js-cookie";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')

const protectedRoutes = [
    '/profile',
    '/store',
    '/trolley',
    '/seller/setting',
    '/seller/balance',
    '/seller/order',
    '/seller/product',
    '/seller/product/add',
    '/seller',
]

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isPrivate = protectedRoutes.includes(path)

    if (isPrivate) {
        const token = req.cookies.get('token')?.value

        // const decode = jwt.verify(token, process.env.SECRET)

        if (!token) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
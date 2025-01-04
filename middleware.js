import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTczNjA3NzM5M30.B6rtVujI4u1Dryy-YqKQ9JCFmcZ-Ut5HPBw5mYgz07s";
    // const token = await request.headers.get("Authorization")?.split(" ")[1];

    if(!token){
        return NextResponse.json({message: "トークンがありません"});
    }

    try{
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt =  await jwtVerify(token, secretKey);
        return NextResponse.next();
    }catch{
        return NextResponse.json({message: "トークンが正しくないので、ログインしてください。"});
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}
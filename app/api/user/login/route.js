import connectDB from "@/app/utils/database";
import { SignJWT } from "jose";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
    const reqBody = await request.json();

    try{
        await connectDB();
        const savedUserData = await UserModel.findOne({email: reqBody.email});
        //ユーザーデータが存在する場合の処理
        if(savedUserData){
            //パスワードが正しい場合の処理
            if(reqBody.password === savedUserData.password){
                const secretKey = new TextEncoder().encode("next-market-app-book");
                const payload = {
                    email: reqBody.email
                };
                const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey);
                return NextResponse.json({message: "ログイン成功", token: token});
            }
            //パスワードが間違っている場合の処理
            else{
                return NextResponse.json({message: "ログイン失敗: パスワードが間違っています。"});
            }
        }
        //ユーザーデータが存在しない場合の処理
        else{
            return NextResponse.json({message: "ログイン失敗: ユーザー登録をしてください。"});
        }
    }catch{
        return NextResponse.json({message: "ログイン失敗"});
    }
}
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json();

    try {
        await connectDB();
        await ItemModel.create(reqBody);
        return NextResponse.json({message: "アイテム生成成功"});
    }catch{
        return NextResponse.json({message: "アイテム作成失敗"});
    }
}

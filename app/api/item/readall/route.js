import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
    try{
        await connectDB();
        const allItems =  await ItemModel.find();
        return NextResponse.json({message: "アイテムの読み取り成功(オール)", allItems: allItems});
    }catch{
        return NextResponse.json({message: "アイテムの読み取りに失敗しました"});
    }
}

export const revalidate = 0;
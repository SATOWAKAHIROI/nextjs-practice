import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
    const params = await context.params;
    const id = params.id;

    const reqBody = await request.json();

    try{
        await connectDB();
        const singleItem = ItemModel.findById(id);
        if(singleItem.email === reqBody.email){
            await ItemModel.deleteOne({_id: id});
            return NextResponse.json({message: "削除成功"});
        }else{
            return NextResponse.json({message: "他の人が作成したアイテムです。"});
        }
        
    }catch{
        return NextResponse.json({message: "削除失敗"});
    }
}
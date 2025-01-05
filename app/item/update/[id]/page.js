"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect} from "react";
import React from "react";
import useAuth from "@/app/utils/useAuth";


const UpdateItem = (context) => {
    
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();
    const loginUserEmail = useAuth();

    useEffect(() => {
        const fetchItem = async() => {
            const getSingleItem = async(id) => {
                const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, {cache: "no-store"});
                const jsonData = await response.json();
                const singleItem = await jsonData.singleItem;
                
                setTitle(singleItem.title);
                setPrice(singleItem.price);
                setImage(singleItem.image);
                setDescription(singleItem.description);
                setEmail(singleItem.email);
            };
            const params = await context.params;
            getSingleItem(params.id);
        };
        fetchItem();
    }, [context]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const params = await context.params;
        const id = params.id;

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${id}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                })
            });
    
            const jsonData = await response.json();
            window.alert(jsonData.message);
            router.push("/");
            router.refresh();
        }catch{
            window.alert("アイテム編集失敗");
        }
    }

    if(loginUserEmail === email){
        return(
            <div>
                <h1>アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required></input>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required></input>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required></input>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明"></textarea>
                    <button>編集</button>
                </form>
            </div>
        );
    }else{
        return(<h1>権限がありません。</h1>)
    }
    
};

export default UpdateItem;
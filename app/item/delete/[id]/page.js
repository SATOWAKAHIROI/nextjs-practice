"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect} from "react";
import React from "react";
import Image from "next/image";
import useAuth from "@/app/utils/useAuth";


const DeleteItem = (context) => {
    
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
        const id = await params.id;

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${id}`,{
                method: "DELETE",
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
            window.alert("アイテム削除失敗");
        }
    }

    if(loginUserEmail === email){
        return(
            <div>
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <Image src={image} width={750} height={500} alt="item-image" priority></Image>
                    <h3>|{price}</h3>
                    <p>{description}</p>
                    <button>削除</button>
                </form>
            </div>
        );
    }else{
        return (<h1>権限がありません。</h1>);
    }

    
};

export default DeleteItem;
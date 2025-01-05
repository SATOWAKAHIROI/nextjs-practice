import Image from "next/image";
import Link from "next/link";

const getSingleItem = async(id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"});
    const jsonData = await response.json();
    const singleItem = await jsonData.singleItem;
    return singleItem;
}

const ReadSingleItem = async(context) => {
    const params = await context.params;
    const id = await params.id;
    const singleItem = await getSingleItem(id);
    return(
        <div className="grid-container-si">
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority></Image>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>|{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
            <div>
                <Link href={`/item/update/${singleItem._id}`}>編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>削除</Link>
            </div>
        </div>
    )
}

export default ReadSingleItem;
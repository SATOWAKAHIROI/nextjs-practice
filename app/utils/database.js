import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://hito1418:N3QLkB4PSO6QySRV@cluster0.ikwzv.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Success: Connected to MongoDB");
    }catch{
        console.log("Failure: Unconnected to MongoDB");
        throw new Error();
    }
};

export default connectDB;
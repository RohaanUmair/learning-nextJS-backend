import mongoose from "mongoose";

export default async function connectionToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Database Connected!');
    } catch (error) {
        console.log(error)
    }
}
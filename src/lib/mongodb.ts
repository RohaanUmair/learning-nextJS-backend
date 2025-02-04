import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

export async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URI as string, {
            dbName: 'nextjs_app',
        });
    } catch (error) {
        throw error;
    }
}

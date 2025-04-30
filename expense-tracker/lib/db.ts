import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI as string

if(!MONGO_URI) {
    throw new Error("please provide the connection string");
}

export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conencted to db');
    }catch(err) {
        console.error('error while conencting',err);
        process.exit(1);
    }
}
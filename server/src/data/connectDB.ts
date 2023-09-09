import mongoose from "mongoose";

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI!;

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Unable to connect", (error as Error).message);
        process.exit();
    }
};

export default connectDB;

import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
        });
        console.log("DB connected");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Error connecting to MongoDB');
    }
};

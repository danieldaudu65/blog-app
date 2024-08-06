import mongoose from "mongoose";

export const ConnectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }

    try {
        await mongoose.connect('mongodb+srv://danieldaudu65:blog_!23@cluster0.pkdz4of.mongodb.net/blog-app-main', {
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

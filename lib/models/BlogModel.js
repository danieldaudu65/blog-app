// lib/models/BlogModel.js
import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
    title: String,
    content: String
});

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    author: String,
    image: String,
    authorImg: String,
    steps: [StepSchema],
    date: { type: Date, default: Date.now }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

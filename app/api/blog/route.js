import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import BlogModel from '@/lib/models/BlogModel'; // Correct import
import { ConnectDB } from '@/lib/config/db';
import mongoose from 'mongoose';
import { promises as fs } from 'fs';

mongoose.set('bufferCommands', false);

// Ensure the database connection is established before handling requests
const ensureDBConnection = async () => {
    if (mongoose.connection.readyState === 0) {
        await ConnectDB();
    }
};
// API to delete a blog

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return NextResponse.json({ error: 'Invalid blog ID format' }, { status: 400 });
        }

        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // Delete the image file
        try {
            await fs.unlink(`./public${blog.image}`);
        } catch (err) {
            console.error('Error deleting image file:', err);
            return NextResponse.json({ error: 'Error deleting image file' }, { status: 500 });
        }

        // Delete the blog document
        await BlogModel.findByIdAndDelete(id);

        return NextResponse.json({ msg: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// API endpoint to get all blogs or a specific blog
export async function GET(request) {
    await ensureDBConnection(); // Ensure DB is connected

    const blogId = request.nextUrl.searchParams.get('id');
    
    if (blogId) {
        if (!/^[0-9a-fA-F]{24}$/.test(blogId)) {
            return NextResponse.json({ error: 'Invalid blog ID format' }, { status: 400 });
        }
        
        try {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
            }
            return NextResponse.json({ blog });
        } catch (err) {
            console.error('Error fetching blog:', err);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        try {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ blogs });
        } catch (err) {
            console.error('Error fetching blogs:', err);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
}

// POST request handler for creating a new blog post
export const POST = async (request) => {
    await ensureDBConnection(); // Ensure DB is connected

    try {
        // Parse form data
        const formData = await request.formData();
        const timestamp = Date.now();
        const image = formData.get('image');

        // Check if the image exists
        if (!image || !image.name) {
            return NextResponse.json({ success: false, msg: 'Image file is required' }, { status: 400 });
        }

        // Convert image to buffer and save it
        const imageByData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByData);
        const imagePath = path.join(process.cwd(), 'public', `${timestamp}_${image.name}`);
        await writeFile(imagePath, buffer);

        // Create steps array from form data
        const steps = [];
        let stepIndex = 1;
        while (formData.get(`step${stepIndex}Title`)) {
            const title = formData.get(`step${stepIndex}Title`);
            const content = formData.get(`step${stepIndex}Content`);
            steps.push({ title, content });
            stepIndex++;
        }

        // Create blog data object
        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: `/${timestamp}_${image.name}`,
            authorImg: formData.get('authorImg'),
            steps
        };

        // Save blog data to the database
        await BlogModel.create(blogData);

        // Return success response
        return NextResponse.json({ success: true, msg: 'Blog added successfully', imgUrl: blogData.image });
    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 });
    }
};

'use client';
import BlogTableItem from '@/components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            setBlogs(response.data.blogs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error('Failed to fetch blogs');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlogs = async (mongoId) => {
        try {
            const response = await axios.delete('/api/blog', {
                params: { id: mongoId },
            });
            toast.success(response.data.msg);
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Failed to delete blog');
        }
    };

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Author name
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className='text-center py-3'>Loading...</td>
                            </tr>
                        ) : (
                            blogs.map((item, index) => (
                                <BlogTableItem
                                    deleteBlogs={deleteBlogs}
                                    key={index}
                                    mongoId={item._id}
                                    title={item.title}
                                    author={item.author}
                                    authorImg={item.authorImg}
                                    date={item.date}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;

'use client';
import BlogTableItem from '@/components/AdminComponents/BlogTableItem';
import React from 'react';

const Page = () => {
    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className='text-xl font-bold mb-4'>All blogs</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border scrollbar-hide border-gray-400'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:table-cell px-6 py-3'>
                                Author Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <BlogTableItem />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;

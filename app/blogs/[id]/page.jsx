"use client"; // This marks the file as a Client Component

import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { assets } from '@/assets/assets';

const Page = ({ params }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchBlogData = async () => {
        try {
            if (!params.id) throw new Error('Blog ID is required');

            const response = await axios.get(`/api/blog`, { params: { id: params.id } });
            if (response.data.blog) {
                setData(response.data.blog);
            } else {
                throw new Error('Blog not found');
            }
        } catch (err) {
            console.error('Error fetching blog data:', err);
            setError('Failed to fetch blog data.');
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, [params.id]);

    if (error) return <div>{error}</div>;
    if (!data) return <div>Loading...</div>;


    return (
        <>
            <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
                <div className='flex justify-between items-center'>
                    <Link href='/'>
                        <Image src={assets.logo} width={100} alt='Company Logo' className='w-[130px] sm:w-auto' />
                    </Link>
                    <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                        Get Started <Image src={assets.arrow} alt='Arrow Icon' />
                    </button>
                </div>
                <div className='text-center my-24'>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                    <Image className='mx-auto mt-6 border border-white rounded-full' src={assets.profile_icon} width={60} height={60} alt='Author Image' />
                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image className='border-full border-white' src={data.image} width={1280} height={720} alt='Blog Image' />
                <h1 className='my-8 text-[26px] font-semibold'>Overview:</h1>
                <p>{data.description}</p>
                {data.steps.map((step, index) => (
                    <div key={index}>
                        <h3 className='my-5 text-[18px] font-semibold'>{step.title}</h3>
                        <p className='my-3'>{step.content}</p>
                    </div>
                ))}
                <h3 className='my-5 text-[18px] font-semibold'>Conclusion</h3>
                <p className='my-3'>{data.conclusion}</p>
                <div className='my-24'>
                    <p className='text-black font font-semibold my-4'>Share this article on social media</p>
                    <div className='flex'>
                        <Image src={assets.facebook_icon} width={50} alt='Facebook Icon' />
                        <Image src={assets.twitter_icon} width={50} alt='Twitter Icon' />
                        <Image src={assets.googleplus_icon} width={50} alt='Google+ Icon' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;

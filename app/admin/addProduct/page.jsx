'use client'
import { assets } from '@/assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Page = () => {
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState([{ title: '', content: '' }]);
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Startup',
        author: 'Alex Bennett',
        authorImg: '/author_img.png'
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleAddStep = () => {
        setSteps([...steps, { title: '', content: '' }]);
    };

    const handleRemoveStep = (index) => {
        setSteps(steps.filter((_, stepIndex) => stepIndex !== index));
    };

    const handleStepChange = (index, field, value) => {
        const newSteps = steps.map((step, stepIndex) => {
            if (stepIndex === index) {
                return { ...step, [field]: value };
            }
            return step;
        });
        setSteps(newSteps);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);

        steps.forEach((step, index) => {
            formData.append(`step${index + 1}Title`, step.title);
            formData.append(`step${index + 1}Content`, step.content);
        });

        try {
            const response = await axios.post('/api/blog', formData);
            const responseData = response.data;

            if (responseData.success) {
                toast.success(responseData.msg);
                setImage(false)
                setData({
                    title: '',
                    description: '',
                    category: 'Startup',
                    author: 'Alex Bennett',
                    authorImg: '/author_img.png'
                })
            } else {
                toast.error('Error: ' + responseData.msg);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form');
        }
    };


    return (
        <>
            <form className='pt-5 px-5 sm:pt-12 sm:pl-16' onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <p className='text-xl'>Upload Thumbnail</p>
                <label htmlFor="image">
                    <Image src={image ? URL.createObjectURL(image) : assets.upload_area} width={140} height={70} alt='' className='mt-4' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                <p className='text-xl mt-4'>Blog Title</p>
                <input type="text" name="title" value={data.title} onChange={onChangeHandler} placeholder='Type here' required className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' />
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder='Write content here' required className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' />
                <p className='text-xl mt-4'>Blog Category</p>
                <select name="category" value={data.category} onChange={onChangeHandler} className='w-40 mt-4 px-4 py-3 text-gray-500 border'>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>

                {steps.map((step, index) => (
                    <div key={index} className='mt-4'>
                        <p className='text-xl mt-4'>Step {index + 1} Title</p>
                        <input
                            type="text"
                            name={`step${index + 1}Title`}
                            value={step.title}
                            onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                            placeholder='Step title'
                            required
                            className='w-full sm:w-[500px] mt-2 px-4 py-3 border '
                        />
                        <p className='text-xl mt-4'>Step {index + 1} Content</p>
                        <textarea
                            name={`step${index + 1}Content`}
                            value={step.content}
                            onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                            placeholder='Step content'
                            required
                            className='w-full sm:w-[500px] mt-2 px-4 py-3 border '
                        />
                        <button type="button" onClick={() => handleRemoveStep(index)} className='mt-4 w-40 h-12 bg-red-600 text-white'>Remove Step</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddStep} className='mt-4 w-40 h-12 bg-black text-white'>Add Step</button>
                <br />
                <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>Add Blog</button>
            </form>
        </>
    );
}

export default Page;

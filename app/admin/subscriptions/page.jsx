'use client'
import SubscriptTableItems from '@/components/AdminComponents/SubscriptTableItems';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const page = () => {

  const [emails, setEmail] = useState([])

  const fetchEmails = async () => {
    const response = await axios.get('/api/email');
    setEmail(response.data.emails)
  }

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete('/api/email', {
      params: {
        id: mongoId
      }
    })
    if (response.data.success) {
      toast.success(response.data.msg)
      fetchEmails()
    }
    else (
      toast.error('error')
    )
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 pl-16'>
      <h1>All Subscription</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border scrollbar-hide border-gray-400'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Subscritioin
              </th>
              <th scope='col' className=' hidden sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>

            </tr>
          </thead>
          <tbody>
            {
              emails.map((item, index) => {
                return <SubscriptTableItems
                  deleteEmail={deleteEmail}
                  email={item.email}
                  mongoId={item._id}
                  key={index}
                  date={item.date}
                />
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;

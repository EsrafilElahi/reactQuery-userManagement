import React from 'react';
import { fetchSingleUser } from '../api/AllApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { BiArrowBack } from "react-icons/bi";


const Detail = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const fetchUserData = async () => {
    // Use queryClient.ensureQueryData to ensure the user data is available in the cache
    const data = await queryClient.ensureQueryData(['users', params.id], () => fetchSingleUser(params.id), {
      enabled: !!params.id
    });
    return data;
  };

  const { data, isLoading, isError, error } = useQuery(['users', params.id], fetchUserData);
  console.log('singe user :', data)

  if (isLoading) return 'loading...';
  if (isError) return <span>{error.message}</span>;

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className='w-full flex justify-start p-5'>
        <BiArrowBack onClick={() => navigate(-1)} className='cursor-pointer' />
      </div>
      
      <section className='flex flex-col'>
        <p className='my-10'>Details User</p>
        <span>name : {data?.name}</span>
        <span>job : {data?.job}</span>
        <span>age : {data?.age}</span>
        <span>country : {data?.country}</span>
      </section>
    </div>
  )
}

export default Detail
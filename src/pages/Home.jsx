import React, { useEffect } from 'react';
import { useQueryClient, useQuery } from "@tanstack/react-query";
import axios from 'axios';

const Home = () => {
  const queryClient = useQueryClient();

  const fetchDefaultUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    return res.data;
  }
  
  const prefetchUser = async () => {
    return await queryClient.prefetchQuery({ queryKey: ['users'], queryFn: fetchDefaultUsers })
  }

  useEffect(() => {
    prefetchUser()
  }, []) // add indeed deps
  

  const { isLoading, isError, data, error } = useQuery(['users'])
  console.log('data :', data);

  if(isLoading) return 'loading...';
  if (isError) return `Error : ${error.message}`;

  return (
    <div>
      Home
    </div>
  )
}

export default Home
import React, { useEffect } from 'react';
import { useQueryClient, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { fetchDefaultUsers } from '../api/AllApi';

const Home = () => {
  const queryClient = useQueryClient();

  const prefetchUser = async () => {
    return await queryClient.prefetchQuery({ queryKey: ['users'], queryFn: fetchDefaultUsers })
  }

  useEffect(() => {
    prefetchUser()
  }, []) // add needed deps


  const { isLoading, isError, data:users, error } = useQuery(['users'])
  console.log('users :', users);

  if (isLoading) return 'loading...';
  if (isError) return `Error : ${error.message}`;

  return (
    <div>
      Home
    </div>
  )
}

export default Home
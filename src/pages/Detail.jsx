import React from 'react';
import { fetchSingleUser } from '../api/AllApi';
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';

const Detail = (props) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const fetchUserData = async () => {
    // Use queryClient.ensureQueryData to ensure the user data is available in the cache
    const data = await queryClient.ensureQueryData(['users', params.id], () => fetchSingleUser(params.id), {
      enabled: !!params.id
    });
    return data;
  };

  const { data, isLoading, error } = useQuery(['users', params.id], fetchUserData);
  console.log('singe user :', data)

  return (
    <div>
      <span>get all users from cache : folan user from  users</span>
      <span>detail</span>
    </div>
  )
}

export default Detail
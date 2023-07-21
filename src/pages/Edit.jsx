import React, { useEffect, useState } from 'react';
import { fetchSingleUser, editSingleUser } from '../api/AllApi';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { BiArrowBack } from "react-icons/bi";


const Detail = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(['users', params.id], () => fetchSingleUser(params.id));
  // console.log('edit user data :', data)

  useEffect(() => {
    setFormData({...data})
  },[data])

  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  // HANDLE CHANGE USER
  const mutation = useMutation(editSingleUser, {
    onSuccess: async (newUser) => {
      // navigate to users list page
      await queryClient.invalidateQueries(['users']);
      navigate("/")
    },
    onMutate: async (newUser) => {
      console.log(newUser)

      await queryClient.cancelQueries(["users", newUser.id])

      const previousUser = queryClient.getQueryData(["users", newUser.id])
      const previousUsers = queryClient.getQueryData(["users"])
      // uptimistic update [users, userId]
      queryClient.setQueryData(['users', newUser.id], newUser)
      
      // const previousUsers = queryClient.getQueryData(["users"])
      // uptimistic update [users]
      // const otherUsers = previousUsers.filter(user => user.id !== newUser.id);
      // const mergeAllUsers = [...otherUsers, newUser];
      // queryClient.setQueryData(['users', newUser.id], mergeAllUsers)


      return { previousUsers, previousUser }
    },
    onError: (err, newUser, context) => {
      queryClient.setQueryData(['users', context.previousUser.id], context.previousUser)
      queryClient.setQueryData(['users'], context.previousUsers)
    },
    onSettled: async (data, error, variables, context) => {
      console.log('variable :', variables)
      if (variables) {
        const userId = variables?.id || context?.previousUser?.id;
        if (userId) {
          await queryClient.invalidateQueries(['users', userId]);
          await queryClient.invalidateQueries(['users']);
          // await queryClient.refetchQueries(['users']);
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  if (isLoading) return 'loading...';
  if (isError) return <span>{error.message}</span>;

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className='w-full flex justify-start p-5'>
        <BiArrowBack onClick={() => navigate(-1)} className='cursor-pointer' />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="w-[60%] flex flex-col gap-10">
        <section className="flex justify-center items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <div className="w-1/2">
              <label htmlFor="name" className="block font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="age" className="block font-bold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData?.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <label htmlFor="job" className="block font-bold mb-2">
                Job
              </label>
              <input
                type="text"
                id="job"
                name="job"
                value={formData?.job}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="country" className="block font-bold mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData?.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
        >
          Edit
        </button>
      </form>
    </div>
  )
}

export default Detail
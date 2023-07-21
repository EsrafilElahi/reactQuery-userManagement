import React, { useEffect, useState } from 'react';
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetchDefaultUsers, fetchSingleUser, addUserToServer } from '../api/AllApi';
import UserItem from '../components/UserItem';
import { v4 as uuidv4 } from "uuid";


const Home = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    job: "",
    country: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // HANDLE ADD USERS
  const mutation = useMutation(addUserToServer, {
    onSuccess: async (newUser) => {
      // prefetch single user
      await queryClient.prefetchQuery(['users', newUser.data.id], () => fetchSingleUser(newUser.data.id), {
        enabled: !!newUser.data.id
      });
    },
    onMutate: async (newUser) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["users"])

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData(["users"])

      // Optimistically update to the new value
      queryClient.setQueryData(['users'], (old) => [...old, newUser])

      // Return a context object with the snapshotted value
      return { previousUsers }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['users'], context.previousUsers)
    },
    // Always refetch after error or success:
    onSettled: async () => {
      await queryClient.invalidateQueries(['users'])
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: uuidv4 };

    mutation.mutate(newUser);
  };

  // HANDLE GET USERS
  const prefetchUsers = async () => {
    return await queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: fetchDefaultUsers,
    });
  };
  useEffect(() => {
    prefetchUsers();
  }, []); // add needed deps

  const { isLoading, isError, data: users, error } = useQuery(["users"]);
  // console.log("users :", users);

  if (isLoading) return "loading...";

  return (
    <div className="">
      <div className="w-full md:w-96 mx-auto mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
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
                  value={formData.name}
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
                  value={formData.age}
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
                  value={formData.job}
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
                  value={formData.country}
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
            Add
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center  mt-10">
        {users?.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Home
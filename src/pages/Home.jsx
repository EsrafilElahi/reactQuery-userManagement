import React, { useEffect, useState } from 'react';
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { fetchDefaultUsers } from '../api/AllApi';
import UserItem from '../components/UserItem';
import { uuid as uuiv4 } from "uuidv4";

const Home = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    job: "",
    country: "",
  });

  // HANDLE ADD USERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addUserToServer = async (user) => {
    const res = axios.post("http://localhost:5000/users", user);
    console.log("user add :", res);
    return res
  }

  const mutation = useMutation(addUserToServer, {
    onSuccess: (newUser) => {
      // refetch the data to update the cache, when we want to access this data
      queryClient.invalidateQueries(["users"]);
      // update the cache immediately without request api to refetch
      // queryClient.setQueryData(["users"], (prevUsers) => [
      //   ...prevUsers,
      //   newUser,
      // ]);
    },
    onMutate: (newUSer) => {
      console.log("on mutate :", newUSer);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: uuiv4 };
    mutation.mutate(newUser, {
      onError: () => {
        // rollback the uptimistic update if mutation fails
        queryClient.invalidateQueries(["users"]);
      },
    });
  };



  // HANDLE GET USERS
  const prefetchUser = async () => {
    return await queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: fetchDefaultUsers,
    });
  };
  useEffect(() => {
    prefetchUser();
  }, []); // add needed deps

  const { isLoading, isError, data: users, error } = useQuery(["users"]);
  console.log("users :", users);

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
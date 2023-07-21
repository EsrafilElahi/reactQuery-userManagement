import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteUser } from "../api/AllApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";


const UserItem = (props) => {
  const { name, age, job, country, id } = props.user;
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const handleGoToEditPage = (e) => {
    e.stopPropagation()
    navigate(`/users-edit/${id}`)
  }


  // HANDLE CHANGE USER
  const mutation = useMutation(deleteUser, {
    onSuccess: async () => {
      // navigate to users list page
      // clg list users
      // navigate("/")
    },
    onMutate: async (id) => {
      queryClient.cancelQueries(["users", id])

      const previousUsers = queryClient.getQueryData(["users"]);
      
      // Optimistically update the data to remove the deleted user from the list
      queryClient.setQueryData(["users"], (oldData) => {
        return oldData.filter((user) => user.id !== id);
      });
      
      return { previousUsers }
    },
    onError: (err, context) => {
      queryClient.setQueryData(['users'], context.previousUsers)
    },
    onSettled: async (data, error, variables, context) => {
      console.log('vars :', variables)
      queryClient.invalidateQueries(['users', variables.id]);
      queryClient.invalidateQueries(['users']);
    },
  });

  const handleDelete = async (e) => {
    e.stopPropagation();
    await mutation.mutateAsync(id)
  }
  
  return (
    <div
      className="bg-blue-300 w-[40rem] my-4 p-2 rounded-md cursor-pointer"
      onClick={() => navigate(`/users-detail/${id}`)}
    >
      <div className="flex">
        <div className="flex flex-[3] flex-wrap gap-4">
          <span className="flex items-center">name : {name}</span>
        </div>
        <div className="flex flex-col justify-center items-center flex-1 gap-5">
          <BiTrashAlt className="cursor-pointer" onClick={(e) => handleDelete(e)} />
          <BiEditAlt className="cursor-pointer" onClick={(e) => handleGoToEditPage(e)} />
        </div>
      </div>
    </div>
  );
};

export default UserItem;
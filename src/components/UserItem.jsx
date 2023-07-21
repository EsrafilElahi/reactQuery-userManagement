import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";


const UserItem = (props) => {
  const { name, age, job, country, id } = props.user;
  const navigate = useNavigate();

  const handleGoToEditPage = (e) => {
    e.stopPropagation()
    navigate(`/users-edit/${id}`)
  }

  const handleDeleteUser = async (id) => {
    // delete user
    const res = axios.delete(`http://localhost:5000/users/${id}`)
    return res.data
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
          <BiTrashAlt className="cursor-pointer"  />
          <BiEditAlt className="cursor-pointer" onClick={(e) => handleGoToEditPage(e)} />
        </div>
      </div>
    </div>
  );
};

export default UserItem;
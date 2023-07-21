import React from "react";
import { useNavigate } from "react-router-dom";

const UserItem = (props) => {
  const { name, age, job, country, id } = props.user;
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-blue-300 w-[40rem] my-4 p-2 rounded-md cursor-pointer"
      onClick={() => navigate(`/users-detail/${id}`)}
    >
      <div className="flex">
        <div className="flex flex-[3] flex-wrap gap-4">
          <span className="flex items-center">name : {name}</span>
          {/* <span className="w-[25%]">age : {age}</span>
          <span className="w-[60%]">job position : {job}</span>
          <span className="w-[25%]">country : {country}</span> */}
        </div>
        <div className="flex flex-col justify-center items-center flex-1 gap-5">
          <span className="cursor-pointer">del</span>
          <span className="cursor-pointer">edit</span>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
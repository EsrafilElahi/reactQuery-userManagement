import React from "react";

const UserItem = (props) => {
  const { name, age, job, country } = props.user;
  return (
    <div className="bg-pink-400 w-[40rem] my-4">
      <div className="flex">
        <div className="flex flex-[8] flex-wrap">
          <span className="w-1/2">name : {name}</span>
          <span className="w-1/2">age : {age}</span>
          <span className="w-1/2">job position : {job}</span>
          <span className="w-1/2">country : {country}</span>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          <span>del</span>
          <span>edit</span>
        </div>
      </div>
    </div>
  );
};

export default UserItem;

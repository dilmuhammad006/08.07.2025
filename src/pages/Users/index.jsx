import React, { useState } from "react";
import toast from "react-hot-toast";
import UserForm from "./userForm";
import { trashImage, updateImage } from "../../assets/assets";

const UsersPage = () => {
  const gender = {
    male: "male",
    female: "female",
  };
  const userList = [
    {
      id: 1,
      name: "Ali",
      age: 12,
      gender: gender.male,
      gmail: "ali@gmail.com",
    },
    {
      id: 2,
      name: "Madina",
      age: 19,
      gender: gender.female,
      gmail: "madina@gmail.com",
    },
  ];
  const [users, setUsers] = useState(userList);
  const [selectedUser, setSelectedUser] = useState();

  const deleteUser = (userId) => {
    let filtered = users.filter((el) => el.id != userId);
    setUsers(filtered);
    toast.success("Success");
  };
  const updateUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <UserForm
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      <div className="m-5">
        <ul>
          <li className="border-b-slate-600 border-b mb-4">
            <b>Count:</b>
            {users.length}
          </li>
        </ul>
      </div>
      {users.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}

      <div className="container grid grid-cols-4 gap-5 p-5">
        {users.map((el) => {
          return (
            <div className="card shadow-2xl p-10 flex flex-col " key={el.id}>
              <img
                src={
                  el.gender == gender.male
                    ? "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                    : "https://static.vecteezy.com/system/resources/previews/004/899/680/non_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg"
                }
                alt=""
                className="rounded-full"
              />
              <p>
                <b>Name:</b>
                {el.name}
              </p>
              <p>
                <b>Age:</b>
                {el.age}
              </p>
              <p>
                <b>Gmail:</b>
                {el.gmail}
              </p>
              <div className="flex w-full justify-end mt-5 gap-5">
                <div onClick={() => deleteUser(el.id)}>{trashImage}</div>
                <div onClick={() => updateUser(el)}>{updateImage}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersPage;

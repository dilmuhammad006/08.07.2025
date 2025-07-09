import React, { useState } from "react";
import toast from "react-hot-toast";

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

  const addUser = (e) => {
    e.preventDefault();
    const form = e.target;
    setUsers([
      ...users,
      {
        id: userList.at(-1)?.id + 1 || 1,
        name: form.name.value,
        age: form.age.value,
        email: form.email.value,
        gender: form.gender.value,
      },
    ]);
    form.reset();
    toast.success("Success!");
  };
  const deleteUser = (userId) => {
    let filtered = users.filter((el) => el.id != userId);
    setUsers(filtered);
    toast.success("Success");
  };
  return (
    <>
      {users.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}

      <form
        className="flex justify-around bg-slate-500 p-3 rounded-xl"
        onSubmit={addUser}
      >
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="name"
          type="text"
          placeholder="Name..."
        />
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="email"
          type="email"
          placeholder="Email..."
        />
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="age"
          type="number"
          placeholder="Age..."
        />
        <select name="gender" id="" className="bg-[#0c2d48] px-7 rounded-xl">
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button className="px-7 py-2 bg-[#0c2d48] rounded-xl cursor-pointer">
          add
        </button>
      </form>
      <div className="m-5">
        <ul>
          <li className="border-b-slate-600 border-b mb-4">
            <b>Count:</b>
            {users.length}
          </li>
        </ul>
      </div>
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
              <button
                className="py-2 mt-5 bg-red-500 border-0 outline-0 rounded-xl cursor-pointer"
                onClick={() => deleteUser(el.id)}
              >
                Delete this user
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersPage;

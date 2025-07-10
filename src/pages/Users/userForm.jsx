import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserForm = ({ setUsers, setSelectedUser, selectedUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (!!selectedUser) {
      setName(selectedUser?.name);
      setGender(selectedUser?.gender);
      setAge(selectedUser?.age);
      setEmail(selectedUser?.email);
    }
  }, [selectedUser]);
  const addUser = (e) => {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      name: form.name.value,
      age: form.age.value,
      email: form.email.value,
      gender: form.gender.value,
    };

    if (!selectedUser) {
      setUsers((prev) => [
        ...prev,
        {
          id: prev.at(-1).id + 1 || prev.length + 1,
          ...newUser,
        },
      ]);
    } else {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser?.id ? { id: user.id, ...newUser } : user
        )
      );
    }
    setAge("");
    setName("");
    setEmail("");
    setGender("");
    setSelectedUser(null);
    toast.success("Success!");
  };
  return (
    <form
      className="flex justify-around bg-slate-500 p-3 rounded-xl"
      onSubmit={addUser}
    >
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="name"
        type="text"
        placeholder="Name..."
        onInput={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="email"
        type="email"
        placeholder="Email..."
        onInput={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="age"
        type="number"
        placeholder="Age..."
        onInput={(e) => setAge(e.target.value)}
        value={age}
      />
      <select
        name="gender"
        id=""
        className="bg-[#0c2d48] px-7 rounded-xl"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      >
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <button className="px-7 py-2 bg-[#0c2d48] rounded-xl cursor-pointer">
        {!!selectedUser ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default UserForm;

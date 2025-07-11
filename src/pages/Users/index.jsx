import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import UserForm from "./userForm";
import { trashImage, updateImage } from "../../assets/assets";
import { useDebounce } from "../../hooks/useDebounce";

const UsersPage = () => {
  const gender = {
    male: "male",
    female: "female",
  };
  const image = {
    male: "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png",
    female:
      "https://static.vecteezy.com/system/resources/previews/004/899/680/non_2x/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
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
  const [sort, setSort] = useState(false);
  const [query, setQuery] = useState("");
  const searchedValue = useDebounce(query, 500);

  const deleteUser = useCallback(
    (userId) => {
      let filtered = users.filter((el) => el.id != userId);
      setUsers(filtered);
      toast.success("Success");
    },
    [users]
  );
  const updateUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };
  const renderUsers = useMemo(() => {
    const filtered = users.filter((el) =>
      el.name.toLowerCase().includes(searchedValue)
    );

    return [...filtered]
      .sort((a, b) => (sort ? b.age - a.age : b.id - a.id))
      .map((el) => (
        <div className="card shadow-2xl p-10 flex flex-col" key={el.id}>
          <img src={image[el.gender]} alt="" className="rounded-full" />
          <p>
            <b>Name:</b> {el.name}
          </p>
          <p>
            <b>Age:</b> {el.age}
          </p>
          <p>
            <b>Gmail:</b> {el.gmail}
          </p>
          <div className="flex w-full justify-end mt-5 gap-5">
            <div onClick={() => deleteUser(el.id)}>{trashImage}</div>
            <div onClick={() => updateUser(el)}>{updateImage}</div>
          </div>
        </div>
      ));
  }, [users, searchedValue, sort]);
  
  return (
    <>
      <UserForm
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      <div className="m-5 flex max-w-2xl w-full justify-between">
        <div className="border py-2 px-3 rounded">
          <b>Count:</b>
          {users.length}
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="border py-2 px-3 rounded outline-0"
          onInput={handleSearch}
        />
        <button
          className="border py-2 px-3 rounded outline-0 cursor-pointer"
          onClick={() => setSort(!sort)}
        >
          {sort ? "Sorted" : "Sort"}
        </button>
      </div>
      {users.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}

      <div className="container grid grid-cols-4 gap-5 p-5">{renderUsers}</div>
    </>
  );
};

export default UsersPage;

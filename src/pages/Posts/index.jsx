import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const deletePost = (postId) => {
    const filtered = products.filter((el) => el.id != postId);
    setProducts(filtered);
    toast.success("Success!");
  };
  const addPost = (e) => {
    e.preventDefault();
    const form = e.target;

    setProducts([
      ...products,
      {
        id: products.at(0)?.id + 1 || products.length + 1,
        title: form.title.value,
        body: form.content.value,
      },
    ]);
    form.reset();
    toast.success("Success!");
  };

  return (
    <>
      {products.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}
      <form
        className="flex justify-around bg-slate-500 p-3 rounded-xl"
        onSubmit={addPost}
      >
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="title"
          type="text"
          placeholder="Title..."
        />
        <textarea
          name="content"
          placeholder="Content..."
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        ></textarea>
        <button className="px-7 py-2 bg-[#0c2d48] rounded-xl cursor-pointer">
          add
        </button>
      </form>
      <div className="m-5">
        <ul>
          <li className="border-b-slate-600 border-b">
            <b>Count:</b>
            {products.length}
          </li>
        </ul>
      </div>
      <div className={` grid grid-cols-4 max-w-[1232px] mx-auto gap-5 `}>
        {products
          .sort((a, b) => b.id - a.id)
          .map((el) => {
            return (
              <div
                className="card flex flex-col p-5 rounded shadow-2xl cursor-pointer justify-between"
                key={el.id}
              >
                <h3 className="text-xl font-bold">{el.title}</h3>
                <p>{el.body}</p>
                <button
                  className="py-2 mt-5 bg-red-500 border-0 outline-0 rounded-xl cursor-pointer"
                  onClick={() => deletePost(el.id)}
                >
                  Delete this Post
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;

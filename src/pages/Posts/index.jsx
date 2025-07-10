import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PostsForm from "./postsForm";
import { trashImage, updateImage } from "../../assets/assets";
function App() {
  const [products, setProducts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();

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
  const updatePost = (product) => {
    setSelectedPost(product);
  };

  return (
    <>
      <PostsForm
        setProducts={setProducts}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
      <div className="m-5">
        <ul>
          <li className="border-b-slate-600 border-b">
            <b>Count:</b>
            {products.length}
          </li>
        </ul>
      </div>
      {products.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}
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
                <div className="flex w-full justify-end mt-5 gap-5">
                  <div onClick={() => deletePost(el.id)}>{trashImage}</div>
                  <div onClick={() => updatePost(el)}>{updateImage}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;

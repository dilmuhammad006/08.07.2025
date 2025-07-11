import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import PostsForm from "./postsForm";
import { trashImage, updateImage } from "../../assets/assets";
import { useDebounce } from "../../hooks/useDebounce";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [sort, setSort] = useState(false);
  const [query, setQuery] = useState("");
  const searchedValue = useDebounce(query, 500);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const deletePost = useCallback(
    (postId) => {
      const filtered = products.filter((el) => el.id != postId);
      setProducts(filtered);
      toast.success("Success!");
    },
    [products]
  );
  const updatePost = useCallback(
    (product) => {
      setSelectedPost(product);
    },
    [products]
  );
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };
  const renderPosts = useMemo(() => {
    const filtered = products.filter((el) =>
      el.title.toLowerCase().includes(searchedValue)
    );

    return [...filtered]
      .sort((a, b) => (sort ? a.id - b.id : b.id - a.id))
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
      });
  }, [products, sort, searchedValue]);

  return (
    <>
      <PostsForm
        setProducts={setProducts}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
      <div className="m-5 flex max-w-2xl w-full justify-between">
        <div className="border py-2 px-3 rounded">
          <b>Count:</b>
          {products.length}
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
      {products.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}
      <div className={` grid grid-cols-4 max-w-[1232px] mx-auto gap-5 `}>
        {renderPosts}
      </div>
    </>
  );
}

export default App;

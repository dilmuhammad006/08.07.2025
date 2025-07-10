import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PostsForm = ({ setProducts, selectedPost, setSelectedPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!!selectedPost) {
      setTitle(selectedPost?.title);
      setContent(selectedPost?.body);
    }
  }, [selectedPost]);

  const addPost = (e) => {
    e.preventDefault();
    const form = e.target;

    const newPost = {
      title: form.title.value,
      body: form.content.value,
    };

    if (!selectedPost) {
      setProducts((posts) => [
        ...posts,
        {
          id: posts.at(0)?.id + 1 || posts.length + 1,
          ...newPost,
        },
      ]);
    } else {
      setProducts((prev) =>
        prev.map((post) =>
          post.id === selectedPost.id ? { id: post.id, ...newPost } : post
        )
      );
    }

    setTitle("");
    setContent("");
    setSelectedPost(null);
    toast.success("Success!");
  };
  return (
    <form
      className="flex justify-around bg-slate-500 p-3 rounded-xl"
      onSubmit={addPost}
    >
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="title"
        type="text"
        placeholder="Title..."
        onInput={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        name="content"
        placeholder="Content..."
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        onInput={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button className="px-7 py-2 bg-[#0c2d48] rounded-xl cursor-pointer">
        {!!selectedPost ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default PostsForm;

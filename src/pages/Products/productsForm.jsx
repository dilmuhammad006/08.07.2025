import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductsForm = ({ setProducts, selectedProduct, setSelectedProduct }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (!!selectedProduct) {
      setPrice(selectedProduct?.price);
      setRating(selectedProduct?.rating?.rate);
      setTitle(selectedProduct?.title);
    }
  }, [selectedProduct]);

  const addProduct = (e) => {
    e.preventDefault();
    const form = e.target;

    const newProduct = {
      title: form.title.value,
      price: form.price.value,
      rating: {
        rate: form.rating.value,
      },
    };

    if (!selectedProduct) {
      setProducts((products) => [
        ...products,
        {
          id: products.at(0)?.id + 1 || products.length + 1,
          image: "https://picsum.photos/200/200",
          ...newProduct,
        },
      ]);
    } else {
      setProducts((products) =>
        products.map((product) =>
          product.id === selectedProduct.id
            ? {
                id: product.id,
                image: product.image,
                ...newProduct,
              }
            : product
        )
      );
    }

    setTitle("");
    setPrice("");
    setRating("");
    setSelectedProduct(null);
    toast.success("Success!");
  };
  return (
    <form
      className="flex justify-around bg-slate-500 p-3 rounded-xl"
      onSubmit={addProduct}
    >
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="title"
        type="text"
        placeholder="Title..."
        onInput={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="price"
        type="number"
        placeholder="Price..."
        onInput={(e) => setPrice(e.target.value)}
        value={price}
      />
      <input
        className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
        name="rating"
        type="number"
        placeholder="Rating..."
        onInput={(e) => setRating(e.target.value)}
        value={rating}
      />
      <button className="px-7 py-2 bg-[#0c2d48] rounded-xl cursor-pointer">
        {!!selectedProduct ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ProductsForm;

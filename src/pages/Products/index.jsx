import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const deleteProduct = (productId) => {
    const filtered = products.filter((el) => el.id != productId);

    setProducts(filtered);
    toast.success("Success!");
  };
  const addProduct = (e) => {
    e.preventDefault();
    const form = e.target;

    setProducts([
      ...products,
      {
        id: products.at(0)?.id + 1 || products.length + 1,
        title: form.title.value,
        price: form.price.value,
        rating: {
          rate: form.rating.value,
        },
        image: "https://picsum.photos/200/200",
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
        onSubmit={addProduct}
      >
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="title"
          type="text"
          placeholder="Title..."
        />
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="price"
          type="number"
          placeholder="Price..."
        />
        <input
          className="outline-0 bg-[#0c2d48] py-2 px-3 rounded-xl"
          name="rating"
          type="number"
          placeholder="Rating..."
        />
        <button className="px-7 py-2 bg-[#0c2d48] rounded-xl cursor-pointer">
          add
        </button>
      </form>
      <div className="m-5">
        <ul>
          <li className="border-b-slate-600 border-b mb-4">
            <b>Count:</b>
            {products.length}
          </li>
        </ul>
      </div>
      <div className="container grid  grid-cols-3  max-w-[1232px]  gap-5 p-5">
        {products
          .sort((a, b) => b.id - a.id)
          .map((el) => {
            return (
              <div key={el.id}>
                <div
                  className={`card flex flex-col p-10 rounded shadow-2xl cursor-pointer h-120 justify-between`}
                >
                  <img
                    src={el.image}
                    alt=""
                    className="w-[200px] h-50 object-contain rounded-2xl bg-white "
                  />
                  <ol>
                    <li>
                      <b>Name :</b> {el.title}
                    </li>
                    <li className="text-green-700">
                      <b className="text-black">Price: </b> {el.price}$
                    </li>
                    <li>
                      <b>Rating: </b> {"⭐".repeat(el?.rating?.rate || 1)}
                    </li>
                  </ol>
                  <button
                    className="py-2 mt-5 bg-red-500 border-0 outline-0 rounded-xl cursor-pointer"
                    onClick={() => deleteProduct(el.id)}
                  >
                    Delete this Products
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductsPage;

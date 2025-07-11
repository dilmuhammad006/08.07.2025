import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ProductsForm from "./productsForm";
import { trashImage, updateImage } from "../../assets/assets";
import { useDebounce } from "../../hooks/useDebounce";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [sort, setSort] = useState(false);
  const [query, setQuery] = useState("");
  const searchedValue = useDebounce(query, 500);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const deleteProduct = useCallback(
    (productId) => {
      const filtered = products.filter((el) => el.id != productId);

      setProducts(filtered);
      toast.success("Success!");
    },
    [products]
  );
  const updateProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
    console.log(searchedValue);
  };

  const renderProducts = useMemo(() => {
    const filtered = products.filter((el) =>
      el.title.toLowerCase().includes(searchedValue)
    );

    return [...filtered]
      .sort((a, b) => (sort ? b.price - a.price : b.id - a.id))
      .map((el) => (
        <div key={el.id}>
          <div className="card flex flex-col p-10 rounded shadow-2xl cursor-pointer h-120 justify-between">
            <img
              src={el.image}
              alt=""
              className="w-[200px] h-50 object-contain rounded-2xl bg-white"
            />
            <ol>
              <li>
                <b>Name :</b> {el.title}
              </li>
              <li className="text-green-700">
                <b className="text-black">Price: </b> {el.price}$
              </li>
              <li>
                <b>Rating: </b> {"⭐".repeat(Math.round(el?.rating?.rate) || 1)}
              </li>
            </ol>
            <div className="flex w-full justify-end mt-5 gap-5">
              <div onClick={() => deleteProduct(el.id)}>{trashImage}</div>
              <div onClick={() => updateProduct(el)}>{updateImage}</div>
            </div>
          </div>
        </div>
      ));
  }, [products, sort, searchedValue]);

  return (
    <>
      {
        <ProductsForm
          setProducts={setProducts}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
        />
      }
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
      <div className="container grid  grid-cols-3  max-w-[1232px]  gap-5 p-5">
        {renderProducts}
      </div>
    </>
  );
};

export default ProductsPage;

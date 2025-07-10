import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductsForm from "./productsForm";
import { trashImage, updateImage } from "../../assets/assets";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

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
  const updateProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      {
        <ProductsForm
          setProducts={setProducts}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
        />
      }
      <div className="m-5">
        <ul>
          <li className="border-b-slate-600 border-b mb-4">
            <b>Count:</b>
            {products.length}
          </li>
        </ul>
      </div>
      {products.length ? null : (
        <div className="text-3xl text-center">Loading...</div>
      )}
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
                  <div className="flex w-full justify-end mt-5 gap-5">
                    <div onClick={() => deleteProduct(el.id)}>{trashImage}</div>
                    <div onClick={() => updateProduct(el)}>{updateImage}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductsPage;

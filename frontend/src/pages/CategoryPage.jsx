import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore.js";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { fetchAllProductByCagegory } = useProductStore();
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchAllProductByCagegory(category);
      setProducts(response.data.product); 
    };

    getProducts();
  }, [category]);

  return (
    <div className="min-h-screen text-tan px-6 py-10">
      <h1 className="text-3xl font-semibold capitalize mb-8">
        {category}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-lg opacity-70">
          No products found
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-black/30  overflow-hidden shadow-lg hover:scale-[1.02] transition"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">
                  {item.name}
                </h2>

                <p className="text-sm opacity-80 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold">
                    ${item.price}
                  </span>

                  <button className="px-4 py-1.5 rounded-lg bg-tan text-oxford font-medium hover:opacity-90">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

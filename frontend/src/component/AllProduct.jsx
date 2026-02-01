import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useProductStore } from "../store/useProductStore.js";

const AllProduct = () => {
  const {
    fetchAllProducts,
    setProducts,
    products,
    deleteProduct,
    loading,
  } = useProductStore();

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchAllProducts();
      setProducts(res.products);
    };
    getProducts();
  }, []);

  const deleteHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="min-h-screen w-full bg-oxford text-tan p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">
        Inventory Products
      </h1>

      {/* Header */}
      <div
        className="
          grid
          grid-cols-[60px_2fr_2fr_120px_56px]
          gap-2 sm:gap-4
          text-xs sm:text-sm
          opacity-70
          border-b border-white/10
          pb-3 mb-3
        "
      >
        <span>Image</span>
        <span>Name</span>
        <span className="hidden sm:block">Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Rows */}
      <div className="space-y-2 sm:space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="
              grid
              grid-cols-[60px_2fr_2fr_120px_56px]
              gap-2 sm:gap-4
              items-center
              bg-white/5
              border border-white/10
              rounded-lg
              p-2 sm:p-3
              hover:bg-white/10
              transition
            "
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-md"
            />

            {/* Name */}
            <span className="font-medium truncate">
              {product.name}
            </span>

            {/* Category */}
            <span className="hidden sm:block opacity-80 truncate">
              {product.category}
            </span>

            {/* Price */}
            <span className="font-semibold text-sm sm:text-base">
              ₹{product.price}
            </span>

            {/* Delete */}
            <button
              onClick={() => deleteHandler(product._id)}
              className="
                flex items-center justify-center
                text-red-400 hover:text-red-500
                transition
              "
              title="Delete product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-sm opacity-70 mt-4">
          Loading products...
        </p>
      )}
    </div>
  );
};

export default AllProduct;

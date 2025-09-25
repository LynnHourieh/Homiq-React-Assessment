import React, { useEffect, useState } from "react";
import type { Product } from "../models/components";
import ProductCard from "../components/ProductCard";
import SelectField from "../components/SelectField";
import Modal from "../components/Modal";
import { LogoutIcon } from "../assets/icons";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import { ProductSkeleton } from "../components/ProductSkeleton";
import { CategorySkeleton } from "../components/CategorySkeleton";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCTS_API;

  const { logout } = useAuth();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(PRODUCTS_API_URL + "/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error("Error loading products:" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    setFilteredProducts(result);
    setPage(1);
  }, [search, category, products]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Pagination
  const start = (page - 1) * pageSize;
  const paginated = filteredProducts.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDFC] via-[#F9F3EF] to-[#EBDDD5]  p-6">
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-end">
        <SearchBar search={search} setSearch={setSearch} />

        <div onClick={() => logout()}>
          <LogoutIcon className=" w-6 h-6 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      <div className="flex items-center justify-between pb-6">
        <h1 className="text-[32px] font-bold text-center text-[#1B3C53] flex-1">
          Every product tells a <i className="text-[#456882]">story!</i>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
       <div className="flex justify-center flex-wrap gap-3">
  {isLoading ? (
    
    [...Array(5)].map((_, i) => <CategorySkeleton key={i} />)
  ) : (
    categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setCategory(cat)}
        className={`px-4 py-2 rounded-lg transition 
          ${
            category === cat
              ? "bg-[#456882] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-[#456882] hover:text-white"
          }`}
      >
        {cat}
      </button>
    ))
  )}
</div>


        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages || 1}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>

            <SelectField
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              options={[
                { value: 8, label: "8 / page" },
                { value: 10, label: "10 / page" },
              ]}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <ProductCard
            product={selectedProduct}
            variant="modal"
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Products;

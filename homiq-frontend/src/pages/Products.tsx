import React, { useEffect, useState } from "react";
import type { Product } from "../models/components";
import ProductCard from "./ProductCard";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCTS_API;

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API_URL + "/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error loading products:" + err);
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
  }, [search, category, products]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-[32px] font-bold text-center text-gray-800 pb-6">
        Our Products
      </h1>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <InputField
            name="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SelectField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

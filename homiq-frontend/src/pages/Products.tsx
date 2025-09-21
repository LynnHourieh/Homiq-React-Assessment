import React, { useEffect, useState } from "react";
import type { Product } from "../models/components";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCTS_API;

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API_URL + "/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:" + err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-[32px] font-bold text-center text-gray-800 pb-6">
        Our Products
      </h1>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

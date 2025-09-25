import Rating from "./Rating";
import { useUnsplashImage } from "../hooks/useUnsplashImage";
import type { ProductCardProps } from "../models/components";
import { useState } from "react";
import { VisibilityIcon } from "../assets/icons";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  variant = "card",
}) => {
  const imageUrl = useUnsplashImage(product.name);
  const [imgLoaded, setImgLoaded] = useState(false);

  // === Card view (used in grid/list) ===
  if (variant === "card") {
    return (
      <div
        className="bg-[#383322] text-[#FFFF] rounded-xl shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
        onClick={() => onSelect?.(product)}
      >
      
        <img
          src={imageUrl || product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`
          rounded-lg h-40 w-full object-cover mb-3
             transform transition-transform duration-300 hover:scale-105
           ${
             imgLoaded ? "opacity-100" : "opacity-0"
           } transition-opacity duration-300
`}
        />

        <h3 className="text-lg font-semibold  ">
          {product.name}
        </h3>
        <p className="text-sm mt-2 line-clamp-1 ">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {" "}
          <p className=" font-bold mt-1 ">${product.price}</p>
          <VisibilityIcon fill="#F9D03F" />
        </div>
      </div>
    );
  }

  // === Modal view ===
  return (
    <div className="bg-[#383322] rounded-2xl p-6 text-white max-w-md mx-auto shadow-xl">
      <div className="flex items-center justify-center">
        <img
          src={imageUrl || product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full max-h-80 object-contain rounded-lg ${imgLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-center">{product.name}</h2>

      <div className="flex justify-center mt-2">
        <Rating value={product.rating} />
      </div>

      <p className="mt-3 text-sm text-gray-300 text-center leading-relaxed">
        {product.description}
      </p>

      <p className="mt-6 text-2xl font-bold text-center">{product.price}$</p>

      <button className="mt-6 w-full bg-[#F9D03F] text-black font-semibold py-3 rounded-lg shadow-md hover:bg-[#F0B100] transition">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

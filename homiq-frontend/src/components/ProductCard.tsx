import Rating from "./Rating";
import { useUnsplashImage } from "../hooks/useUnsplashImage";
import type { Product } from "../models/components";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
const imageUrl = useUnsplashImage(product.name);
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
      <img
        src={imageUrl || product.image}
        alt={product.name}
        className="rounded-lg h-40 w-full object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
      <div className="flex items-center justify-center mt-1">
        <Rating value={product.rating} />
      </div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {product.description}
      </p>
    </div>
  );
};

export default ProductCard;

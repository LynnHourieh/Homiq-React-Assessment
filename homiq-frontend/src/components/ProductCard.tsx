import Rating from "./Rating";
import { useUnsplashImage } from "../hooks/useUnsplashImage";
import type { ProductCardProps } from "../models/components";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  variant = "card",
  onClose,
}) => {
  const imageUrl = useUnsplashImage(product.name);

  // === Card view (used in grid/list) ===
  if (variant === "card") {
    return (
      <div
        className="bg-white rounded-xl shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
        onClick={() => onSelect?.(product)}
      >
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
  }

  // === Modal view ===
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center justify-center bg-gray-100 rounded-lg">
        <img
          src={imageUrl || product.image}
          alt={product.name}
          className="max-h-64 object-contain"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-xl font-semibold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center justify-center mt-1">
          <Rating value={product.rating} />
        </div>

        <p className="text-gray-600">{product.description}</p>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={onClose}
        >
          Back to Product Page
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

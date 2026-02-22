'use client'
import Image from "next/image";
import { Product } from "../types/wholeProduct";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useCartStore } from "@/app/features/cart/store/cartStore";
import { useWishlistStore } from "@/app/features/wishlist/store/wishlistStore";

interface ProductCardProps {
  product: Product;
}

export const discountPrice = (price: number, discountPercentage: number) => {
  return (price - (price * discountPercentage/100)).toFixed(2);
}

export default function ProductCard({ product}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist)

  return (
    <div className="w-64 border rounded-lg hover:shadow-xl group bg-white cursor-pointer transition-shadow duration-300">
      <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
        <Image className="bg-white object-contain group-hover:scale-110 transition-transform duration-500" src={product.thumbnail} alt={product.title} width={300} height={300} loading="eager" />
        <Button
          variant="transparent"
          size="sm"
          icon={<Heart size={18} className="text-gray-600" />}
          aria-label="Add to wishlist"
          onClick={() => addToWishlist(product)}
          className="absolute top-2 right-2 hover:bg-yellow-400 hover:scale-110 group-hover:bg-gray-200 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 px-0 py-0 rounded-full"
        >
          <span className="sr-only">Add to wishlist</span>
        </Button>
        <Button
          variant="gray"
          size="sm"
          icon={<ShoppingCart size={18} className="text-gray-600" />}
          iconPosition="right"
          onClick={(e) => {e.stopPropagation(); addToCart(product)}}
          className="absolute bottom-2 right-2 transform opacity-0 translate-y-2 hover:scale-110 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-0 py-0 rounded-full"
        >
          <span className="font-inter font-semibold text-gray-700 text-sm">Add to cart</span>
        </Button>
        <span className="absolute top-2 left-2 bg-yellow-400 text-gray-800 font-inter text-xs px-2 py-1 rounded-full">-{product.discountPercentage}%</span>
      </div>
      <h2 className="font-medium leading-tight font-inter px-2 py-1.5 text-gray-700 group-hover:text-yellow-500">{product.title}</h2>
      <div className="flex items-center px-2 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-yellow-500" : "fill-gray-400"}`} />
        ))}
      </div>

      {/* price section */}
      <div className="flex items-center mb-1">
        <span className="font-inter text-gray-900 px-2">${discountPrice(product.price, product.discountPercentage)}</span>
        <span className="font-inter text-sm text-gray-500 line-through">{product.price}</span>
      </div>
    </div>
  );
}

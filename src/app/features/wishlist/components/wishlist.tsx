'use client'
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { X, Heart, ShoppingCart, Trash2, HeartOff } from "lucide-react";
import { discountPrice } from "../../products/components/productCard";
import Image from "next/image";
import { useWishlistStore } from "@/app/features/wishlist/store/wishlistStore";
import { useCartStore } from "@/app/features/cart/store/cartStore";
import { useRouter, usePathname } from "next/navigation";

interface WishlistProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Wishlist({ isOpen, onClose }: WishlistProps) {

    const items = useWishlistStore(state => state.items);
    const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);
    const clearWishlist = useWishlistStore(state => state.clearWishlist);
    const addAllToCart = useWishlistStore(state => state.addAllToCart)
    const addToCart = useCartStore(state => state.addToCart)

    const router = useRouter();
    const pathname = usePathname();

    function handleBrowseProducts() {
      if(pathname === '/'){
        onClose();
      } else {
        if(window.history.length > 1){
          router.back();
          onClose();
        } else {
          router.push('/');
          onClose();
        }
      }
    }
    
    return (
        <AnimatePresence>
            {isOpen && ( 
                <div className="fixed inset-0 z-20 flex justify-end">
                    <motion.div id="overlay" className="absolute inset-0 bg-black/60" onClick={ onClose }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>

                    <motion.div id="wishlist"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-96 h-full grid grid-rows-[auto_1fr_auto] px-5 py-3 font-inter border-l border-gray-300 bg-white shadow-lg z-10"
                    >
                    
                        <div id="wishlist-header" className="flex justify-between items-center m-0">
                            <h1 className="text-gray-700 font-semibold text-lg">Wishlist <Heart className="text-gray-300 fill-red-500 inline-block ml-2 mb-1" /></h1>
                            <Button 
                                variant="transparent"
                                size="sm"
                                icon={<X className="text-gray-500 hover:text-gray-700 w-4" />}
                                aria-label="Close wishlist"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close wishlist</span>    
                            </Button>
                        </div>

                        <div id="wishlist-items" className="overflow-y-scroll hide-scrollbar">
                            { items.map(item => (
                                <div key={item.id} className="flex items-center justify-between text-sm text-gray-700 py-2 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <Image src={item.thumbnail} alt={item.title} width={40} height={40} className="object-contain bg-gray-200 mr-2.5 rounded" />
                                        <div>
                                            <span className="font-medium">{item.title}</span>
                                            <span className="block my-1 text-gray-700 text-xs font-medium">
                                                ${discountPrice(item.price, item.discountPercentage)}
                                                <span className="text-[10px] mx-1 line-through text-gray-500">{item.price}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Button
                                            variant="main"
                                            size="sm"
                                            icon={<ShoppingCart className="text-gray-800 w-4 h-4" />}
                                            aria-label="Add to cart"
                                            onClick={() => addToCart(item) }
                                            className="w-8 h-8 relative bg-gray-200 hover:bg-gray-300 rounded mr-2.5"
                                        >
                                            <span className="sr-only">Add to cart</span>
                                            <span className="absolute -top-1 right-1">+</span>
                                        </Button>
                                        <Button
                                            variant="main"
                                            size="sm"
                                            icon={<Trash2 className="text-gray-800 w-4 h-4" />}
                                            aria-label="Remove from wishlist"
                                            onClick={() => removeFromWishlist(item.id) }
                                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded mr-2.5"
                                        >
                                            <span className="sr-only">Remove from wishlist</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            { items.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                  <HeartOff className="w-10 h-12 mb-2" />
                                  <p>Your wishlist is empty.</p>
                                  <p className="text-xs text-center">Save products you love and find them here instantly.</p>
                                    <Button 
                                        variant="transparent" 
                                        size="sm" 
                                        className="mt-2 text-sm underline" 
                                        onClick={handleBrowseProducts}>
                                      Browse Products
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        <div id="wishlist-btn" className="w-full"> 
                            <Button
                                variant="main"
                                size="md"
                                icon={<Trash2 className="text-gray-800" />}
                                iconPosition="right"
                                aria-label="Clear wishlist"
                                onClick={clearWishlist}
                                className="w-full border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-2 font-medium"                      
                            >
                              Clear Wishlist
                            </Button> 
                            <Button
                                variant="main"
                                size="md"
                                icon={<ShoppingCart className="text-gray-800" />}
                                iconPosition="right"
                                aria-label="Add all to cart"
                                onClick={addAllToCart}
                                className="w-full border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"                      
                            >
                                Add all to Cart
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
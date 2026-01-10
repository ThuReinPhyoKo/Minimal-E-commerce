import { motion } from "framer-motion";
import { Button } from "./button";
import { CircleX, Heart, ShoppingCart } from "lucide-react";

interface WishlistProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Wishlist({ isOpen, onClose }: WishlistProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20 flex justify-end">
            <div id="overlay" className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            <motion.div id="wishlist"
                initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'tween', duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="w-96 h-full grid grid-rows-[auto_1fr_auto] px-5 py-3 font-inter border-l border-gray-300 bg-white shadow-lg z-10"
            >

                <div id="wishlist-header" className="flex justify-between items-center m-0">
                    <h1 className="text-gray-700 font-semibold text-lg">Wishlist <Heart className="text-gray-300 fill-red-500 inline-block ml-2 mb-1" /></h1>
                    <Button 
                        variant="transparent"
                        size="sm"
                        icon={<CircleX className="text-gray-500 hover:text-gray-700" />}
                        aria-label="Close wishlist"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close wishlist</span>    
                    </Button>
                </div>

                <div id="wishlist-items" className="overflow-y-scroll hide-scrollbar">
                    {/* Wishlist items would go here */}
                </div>

                <div id="wishlist-btn" className="w-full">  
                  <Button
                      size="md"
                      icon={<ShoppingCart className="text-white" />}
                      iconPosition="right"
                      aria-label="Add all to cart"
                      className="w-full font-medium bg-gray-700 text-white shadow-lg border border-gray-300"                      
                  >
                      Add all to Cart
                  </Button>
                </div>
            </motion.div>
        </div>
    );
}
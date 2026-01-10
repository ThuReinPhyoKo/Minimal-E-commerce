"use client"
import { Button } from "./button";
import { CircleX, X, CirclePlus, CircleMinus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { discountPrice } from "./productCard";
import Image from "next/image";
import { Product } from "@/app/lib/getProducts";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    discountPercentage: number;
    thumbnail: string;
  }[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}


export default function Cart( { isOpen, onClose, addToCart, cartItems = [], removeFromCart, increaseQuantity, decreaseQuantity }: CartProps) {
    if(!isOpen) return null;

    const cartTotal = cartItems.reduce((total, item) => {
      const price = Number(discountPrice(item.price, item.discountPercentage));
      const quantity = Number(item.quantity);
      return total + price * quantity;
    }, 0);

    const itemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-20 flex justify-end">

      <div id="overlay" className="absolute inset-0 bg-black/60" onClick={ onClose }></div>

      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'tween', duration: 0.3 }}
        id="cart" className="w-96 h-full grid grid-rows-[auto_1fr_auto_auto] px-5 py-3 font-inter border-l border-gray-300 bg-white shadow-lg z-10" onClick={(e) => e.stopPropagation()}>

        <div id="cart-header" className="flex justify-between items-center m-0">
            <h1 className="text-gray-700 font-semibold text-lg">Shopping Cart <ShoppingCart className="text-gray-600 inline-block ml-2" /></h1>
            <Button 
                variant="transparent"
                size="sm"
                icon={<CircleX className="text-gray-500 hover:text-gray-700" />}
                aria-label="Close cart"
                onClick={onClose}
            >
                <span className="sr-only">Close cart</span>    
            </Button>
        </div>

        <div id="cart-items" className="overflow-y-scroll hide-scrollbar">
          { cartItems.map(item => (
            <div key={item.id} className="flex items-center text-sm py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Button
                  variant="transparent"
                  size="xs"
                  icon={<X className="text-gray-500 hover:text-gray-700 w-4" />}
                  aria-label={`Remove ${item.title} from cart`}
                  onClick={() => removeFromCart?.(item.id)}
                  className="m-0 p-0 w-2"
                >
                  <span className="sr-only">Remove item from cart</span>
                </Button>
                <Image className="w-10 h-10 object-contain bg-gray-200 rounded" src={item.thumbnail} alt={item.title} width={40} height={40} />
              </div>
              <div className="flex items-center justify-between w-4/5 ml-3">
                <div className="flex flex-col">
                  <span className="text-gray-700">{item.title}</span>
                  <span className="text-gray-700 flex items-center gap-2">
                    <Button
                      variant="transparent"
                      size="xs"
                      icon={<CircleMinus className="text-gray-500 hover:text-gray-700 w-4" />}
                      aria-label={`Decrease quantity of ${item.title}`}
                      onClick={() => decreaseQuantity?.(item.id)}
                      className="p-0 m-0 w-4 inline-flex"
                    >
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                       {item.quantity}
                    <Button
                      variant="transparent"
                      size="xs"
                      icon={<CirclePlus className="text-gray-500 hover:text-gray-700 w-4" />}
                      aria-label={`Increase quantity of ${item.title}`}
                      onClick={() => increaseQuantity?.(item.id)}
                      className="p-0 m-0 w-4 inline-flex"
                    >
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </span>
                </div>
                <span className="text-gray-700">${discountPrice(item.price, item.discountPercentage)}</span>
              </div>
            </div>
          ))}
        </div>

        <div id="cart-summary" className="text-gray-700 w-full py-4 border-t border-gray-500 flex flex-col gap-2">
          <h2 className="font-semibold">Order Summary</h2>
          <p className="flex">Total Items: <span className="ml-auto">{itemTotal} items</span></p>
          <p className="flex">Total Price: <span className="ml-auto">${cartTotal.toFixed(2)}</span></p>
        </div>

        <div id="cart-btn" className="w-full">  
          <Button
              size="md"
              className="w-full bg-gray-700 text-white shadow-lg border border-gray-300"
          >
              Checkout ${cartTotal.toFixed(2)}
          </Button>
        </div>
      </motion.div>
      
    </div>

  );
}
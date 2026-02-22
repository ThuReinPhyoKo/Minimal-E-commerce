"use client"
import { Button } from "../../../components/ui/button";
import { X, CirclePlus, CircleMinus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { discountPrice } from "../../products/components/productCard";
import Image from "next/image";
import { useCartStore } from "@/app/features/cart/store/cartStore";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export default function Cart( { isOpen, onClose, onCheckout }: CartProps) {
    
    const items = useCartStore((state) => state.items)
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

    const totalPrice = useCartStore((state) => 
      items.reduce((total, i) => {
      const price = Number(discountPrice(i.price, i.discountPercentage));
      const quantity = Number(i.quantity);
      return total + price * quantity;
    }, 0)
    ) 

    const itemTotal = items.reduce((total, i) => total + i.quantity, 0);

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

          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            id="cart" className="w-96 h-full grid grid-rows-[auto_1fr_auto_auto] px-5 py-3 font-inter border-l border-gray-300 bg-white shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
            
            <div id="cart-header" className="flex justify-between items-center m-0">
                <h1 className="text-gray-700 font-semibold text-lg">Shopping Cart <ShoppingCart className="text-gray-600 inline-block ml-2" /></h1>
                <Button 
                    variant="transparent"
                    size="sm"
                    icon={<X className="text-gray-500 hover:text-gray-700 w-4" />}
                    aria-label="Close cart"
                    onClick={onClose}
                >
                    <span className="sr-only">Close cart</span>    
                </Button>
            </div>

            <div id="cart-items" className="overflow-y-scroll hide-scrollbar">
              { items.map(i => (
                <div key={i.id} className="flex items-center text-sm py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="transparent"
                      size="xs"
                      icon={<X className="text-gray-500 hover:text-gray-700 w-4" />}
                      aria-label={`Remove ${i.title} from cart`}
                      onClick={() => removeFromCart?.(i.id)}
                      className="m-0 p-0 w-2"
                    >
                      <span className="sr-only">Remove item from cart</span>
                    </Button>
                    <Image className="object-contain bg-gray-200 rounded" src={i.thumbnail} alt={i.title} width={40} height={40} />
                  </div>
                  <div className="flex items-center justify-between w-4/5 ml-3">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">{i.title}</span>
                      <span className="text-gray-700 flex items-center gap-2">
                        <Button
                          variant="transparent"
                          size="xs"
                          icon={<CircleMinus className="text-gray-500 hover:text-gray-700 w-4" />}
                          aria-label={`Decrease quantity of ${i.title}`}
                          onClick={() => decreaseQuantity?.(i.id)}
                          className="p-0 m-0 w-4 inline-flex"
                        >
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                           {i.quantity}
                        <Button
                          variant="transparent"
                          size="xs"
                          icon={<CirclePlus className="text-gray-500 hover:text-gray-700 w-4" />}
                          aria-label={`Increase quantity of ${i.title}`}
                          onClick={() => increaseQuantity?.(i.id)}
                          className="p-0 m-0 w-4 inline-flex"
                        >
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </span>
                    </div>
                    <span className="text-gray-700">${discountPrice(i.price, i.discountPercentage)}</span>
                  </div>
                </div>
              ))}

              { items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingCart className="w-10 h-12 mb-2" />
                  <p>Your cart is empty.</p>
                </div>
              )}
            </div>
            
            <div id="cart-summary" className="text-gray-700 w-full py-4 border-t border-gray-500 flex flex-col gap-2">
              <h2 className="font-semibold">Order Summary</h2>
              <p className="flex">Total Items: <span className="ml-auto">{itemTotal} {itemTotal > 1 ? 'items' : 'item'}</span></p>
              <p className="flex">Total Price: <span className="ml-auto">${totalPrice.toFixed(2)}</span></p>
            </div>
            
            <div id="cart-btn" className="w-full">  
              <Button
                  disabled={items.length === 0}
                  variant="main"
                  size="md"
                  onClick={onCheckout}
                  className="w-full border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                  Checkout ${totalPrice.toFixed(2)}
              </Button>
            </div>
          </motion.div>
            
        </div>
      )}
    </AnimatePresence>

  );
}
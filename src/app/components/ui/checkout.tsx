'use client'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import { useCartStore } from "@/app/store/cartStore";
import { discountPrice } from "./productCard";
import { X, MapPin, Truck, Clock } from "lucide-react";
import Image from "next/image";
import { getDeliveryRange } from "@/app/utils/getDeliveryRange";
import { useState } from "react";
import PaymentMethod from "./paymentMethod";
import Loader from "./loader";
import { useYourOrdersStore } from "@/app/store/yourOrdersStore";

interface CheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    onYourOrderOpen?: () => void;
}

export default function Checkout({isOpen, onClose, onYourOrderOpen}: CheckoutProps) {
    const items = useCartStore(state => state.items);
    const clearCart = useCartStore(state => state.clearCart);
    const createOrder = useYourOrdersStore(state => state.createOrder);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ shippingForm, setShippingForm ] = useState({
        streetAddress: '',
        city: '',
        postalCode: '',
    });

    const totalPrice = useCartStore((state) => 
          items.reduce((total, i) => {
          const price = Number(discountPrice(i.price, i.discountPercentage));
          const quantity = Number(i.quantity);
          return total + price * quantity;
        }, 0)
    ) 
    
    const itemTotal = items.reduce((total, i) => total + i.quantity, 0);

    const isDisabled = !shippingForm.streetAddress || !shippingForm.city || !shippingForm.postalCode;

    const demoStreet = "123 Demo St, Test City, 12345";
    const demoCity = "Test City";
    const demoPostalCode = "12345";

    const fillDemo = () => {
      setShippingForm({
        streetAddress: demoStreet,
        city: demoCity,
        postalCode: demoPostalCode
      });
    };

    const handleCompletePurchase = () => {
      setIsLoading(true);

      createOrder(items, totalPrice);
      // simulate async
      setTimeout(() => {
        setIsSuccess(true);      // Loader will show check because isSuccess=true
        setTimeout(() => {
            setIsLoading(false);   // finally hide loader
            setIsSuccess(false);
            onClose?.();
            clearCart();
            setShippingForm({ streetAddress: '', city: '', postalCode: '' });
            onYourOrderOpen?.();
            // Add order to your orders store
        }, 1000); // success visible for 1000ms
      }, 2000); // simulated request
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-20 flex justify-end">
                        <motion.div id="overlay" className="absolute inset-0 bg-black/60" onClick={ onClose }
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>

                        <motion.div className="w-2/5 h-9/10 bg-white border border-gray-700 rounded-xl font-inter fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-4" id="checkout"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{scale: 0.8, opacity: 0}}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-black font-semibold text-xl px-6 pb-2">Complete Your Order</h2>
                            <div className="flex flex-col flex-1 overflow-y-scroll checkout-scrollbar max-h-9/10 ">
                                <Button
                                    variant="transparent"
                                    size="xs"
                                    aria-label="Close checkout"
                                    icon={<X className="text-gray-400 w-5 hover:text-gray-950"/>}
                                    onClick={onClose}
                                    className="absolute top-2 right-3"
                                >
                                    <span className="sr-only">Close checkout</span>
                                </Button>
                    
                                <div id="order-summary" className="flex flex-col gap-1 px-6">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 font-medium mt-2">Order Summary</p>
                                        <p className="text-sm text-gray-700 font-medium mt-2">{itemTotal} {itemTotal > 1 ? 'items' : 'item'}</p>
                                    </div>
                    
                                    <div className="max-h-60 overflow-y-auto hide-scrollbar my-2">
                                        { items.map(i => (
                                          <div key={i.id} className="flex items-center text-sm py-1">
                                            <Image className="object-contain bg-gray-200 rounded" src={i.thumbnail} alt={i.title} width={50} height={50} />
                                            <div className="flex flex-col ml-2 gap-1">
                                              <p className="text-gray-700">{i.title}</p>
                                              <p className="text-gray-500 text-sm">Qty: {i.quantity}</p>
                                            </div>
                                            <p className="text-gray-700 text-sm ml-auto">${(Number(discountPrice(i.price, i.discountPercentage)) * i.quantity).toFixed(2)}</p>
                                          </div>
                                        ))}
                                    </div> 
                                </div>
                                    
                                <div id="separator" className="border-t border-black/20 scale-y-50 origin-top my-3"></div>
                                    
                                <div id="shipping" className="mb-5">
                                    <div className="flex items-center justify-between mt-4 px-6">
                                        <p className="text-sm text-gray-500 font-medium">Shipping Details</p>
                                        <button onClick={fillDemo} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">Use Demo Address</button>
                                    </div>
                                    
                                    <div id="shipping-address" className="flex flex-col text-sm text-black border border-[hsl(220,13%,91%)] rounded-md bg-[hsl(220,13%,98%)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] py-2 mx-6 my-4">
                                        <div className="flex items-center px-2.5">
                                            <MapPin className="text-gray-500 w-4 h-4 mr-2" />
                                            <p className="text-sm text-gray-700 font-medium">Shipping Address</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-2 *:bg-white *:border *:border-gray-300 *:rounded-md *:shadow-[0_1px_2px_rgba(0,0,0,0.04)] *:px-2.5 px-2.5 py-1">
                                          <input
                                            value={shippingForm.streetAddress}
                                            onChange={(e) => setShippingForm({...shippingForm, streetAddress: e.target.value})}
                                            aria-label="Street Address"
                                            placeholder="Street Address"
                                            required
                                            className="h-9 text-sm"
                                          />
                                          <input
                                            value={shippingForm.city}
                                            onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                                            aria-label="City"
                                            placeholder="City"
                                            required
                                            className="h-9 text-sm"
                                          />
                                          <input
                                            value={shippingForm.postalCode}
                                            onChange={(e) => setShippingForm({...shippingForm, postalCode: e.target.value})}
                                            aria-label="Postal Code"
                                            placeholder="Postal Code"
                                            required
                                            className="h-9 text-sm col-span-2 sm:col-span-1"
                                          />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3 mx-6">
                                        <div className="flex items-center px-3 py-3 border border-[hsl(220,13%,91%)] rounded-md bg-[hsl(220,13%,98%)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                                            <Truck className="text-gray-500 w-5 h-5 mr-3" />
                                            <div className="flex flex-col">
                                                <p className="text-xs text-gray-500">Shipping</p>
                                                <p className="text-sm text-gray-700 font-medium">Free</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center px-3 py-3 border border-[hsl(220,13%,91%)] rounded-md bg-[hsl(220,13%,98%)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                                            <Clock className="text-gray-500 w-5 h-5 mr-3" />
                                            <div className="flex flex-col">
                                                <p className="text-xs text-gray-500">Est. Delivery</p>
                                                <p className="text-sm text-gray-700 font-medium">{getDeliveryRange()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    
                                <div id="separator" className="border-t border-black/20 scale-y-50 origin-top my-3"></div>

                                <PaymentMethod />

                                <div id="pay" className="flex flex-col text-sm text-black border-t border-[hsl(220,13%,91%)] bg-[hsl(220,13%,98%)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] py-2 px-6 mt-auto mb-0">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 font-medium mt-2">Subtotal</p>
                                        <p className="text-sm text-gray-800 font-medium mt-2">${totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 font-medium mt-2">Shipping</p>
                                        <p className="text-sm text-gray-800 font-medium mt-2">Free</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 font-medium mt-2">Tax <span className="text-xs text-gray-400">(for demo purposes only)</span></p>
                                        <p className="text-sm text-gray-800 font-medium mt-2">${(totalPrice * 0.08).toFixed(2)}</p>
                                    </div>
                                    <div className="border-t border-black/20 scale-y-50 origin-top my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg text-gray-900 font-semibold mt-2">Total</p>
                                        <p className="text-lg text-gray-900 font-semibold mt-2">${(totalPrice + totalPrice * 0.08).toFixed(2)}</p>
                                    </div>
                                    <Button
                                        variant="main"
                                        size="md"
                                        onClick={handleCompletePurchase}
                                        disabled={isDisabled}
                                        className="w-full mt-4 disabled:bg-gray-800 disabled:text-gray-100 disabled:hover:bg-gray-600 border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                                    >
                                        Complete Purchase
                                    </Button>
                                    
                                </div>
                                
                            </div>

                            { isLoading && <Loader isSuccess={isSuccess} /> }
                            
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>
        </>
    )
} 

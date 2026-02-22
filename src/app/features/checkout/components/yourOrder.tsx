'use client'
import { X, Truck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { useYourOrdersStore } from "@/app/features/checkout/store/orderStore";

interface YourOrderProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function YourOrder({ isOpen, onClose }: YourOrderProps) {
    const orders = useYourOrdersStore(state => state.orders);
    
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
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="w-1/2 h-full grid grid-rows-[auto_1fr] px-5 py-3 font-inter border-l border-gray-300 bg-white shadow-lg z-10"
                    >

                        <div id="your-order-header" className="flex justify-between items-center m-0">
                            <h1 className="text-gray-700 font-semibold text-lg">Your Orders <Truck className="text-gray-700 inline-block ml-2" />...</h1>
                            <Button 
                                variant="transparent"
                                size="sm"
                                icon={<X className="text-gray-500 hover:text-gray-700 w-4" />}
                                aria-label="Close your orders"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close your orders</span>    
                            </Button>
                        </div>

                        <div id="your-order-items" className="overflow-y-scroll hide-scrollbar">
                            {orders.length === 0 ? (
                                <p className="text-gray-500 text-center mt-10">You have no orders yet.</p>
                            ) : (
                                orders.slice().reverse().map(order => (
                                    <div key={order.id} className="border rounded p-4 mb-4">
                                        <h2 className="text-gray-700 font-semibold mb-2">Order ID: {order.id}</h2>
                                        <p className="text-gray-500 text-sm mb-2">Status: <span className="text-green-600">{order.status}</span></p>
                                        <p className="text-gray-500 text-sm mb-2">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                                        <p className="text-gray-500 text-sm mb-2">Total: ${order.total.toFixed(2)}</p>
                                        <div className="mt-2">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex justify-between text-sm">
                                                    <p className="text-gray-700">{item.title}</p>
                                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )))}
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
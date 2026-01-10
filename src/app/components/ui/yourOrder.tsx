import { CircleX, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./button";

interface YourOrderProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function YourOrder({ isOpen, onClose }: YourOrderProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20 flex justify-end">
            <div id="overlay" className="absolute inset-0 bg-black/60" onClick={onClose}></div>

            <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'tween', duration: 0.3 }}
                className="w-96 h-full grid grid-rows-[auto_1fr] px-5 py-3 font-inter border-l border-gray-300 bg-white shadow-lg z-10"
            >
                
                <div id="your-order-header" className="flex justify-between items-center m-0">
                    <h1 className="text-gray-700 font-semibold text-lg">Your Orders <Truck className="text-gray-700 inline-block ml-2" />...</h1>
                    <Button 
                        variant="transparent"
                        size="sm"
                        icon={<CircleX className="text-gray-500 hover:text-gray-700" />}
                        aria-label="Close your orders"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close your orders</span>    
                    </Button>
                </div>

                <div id="your-order-items" className="overflow-y-scroll hide-scrollbar">
                    {/* Your order items would go here */}
                </div>

            </motion.div>
        </div>
    );
}
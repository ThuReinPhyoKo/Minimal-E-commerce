import { AnimatePresence, motion } from "framer-motion"
import { useFormStore } from "../store/formStore"
import { X } from "lucide-react";

export default function AddForm() {

    const form = useFormStore((s) => s.form);
    const closeForm = useFormStore((s) => s.closeForm);

    return (
        <AnimatePresence>
            {form === "add" && (
                <div className="fixed inset-0 z-20">

                    <motion.div id="overlay" className="absolute inset-0 bg-black/60" onClick={ closeForm }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>

                    <motion.div className="bg-white w-3/5 h-4/5 p-5 rounded-xl font-inter fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{scale: 0.8, opacity: 0}}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-black font-semibold text-lg">Add New Product</h2>
                        <X onClick={closeForm} className="absolute top-2 right-4 cursor-pointer w-4 text-gray-600 hover:text-gray-800" />
                    </motion.div>

                </div>
                
            )}
        </AnimatePresence>
    )
}
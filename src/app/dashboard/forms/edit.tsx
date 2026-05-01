'use client'
import { AnimatePresence, motion } from "framer-motion"
import { useFormStore } from "../store/formStore"
import { X, Upload } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { useProductStore } from "@/app/features/products/store/productStore";

export default function EditForm() {

    const form = useFormStore((s) => s.form);
    const closeForm = useFormStore((s) => s.closeForm);
    const product = useFormStore((s) => s.product);
    const editProduct = useProductStore((s) => s.editProduct);
    
    const [ data, setData ] = useState({
        id: "",
        title: "",
        price: "",
        brand: "",
        discountPercentage: "",
        thumbnail: "",
        description: "",
        category: "",
    })
    
    useEffect(() => {
        if(product){
            setData({...product, id: String(product.id), price: String(product.price), discountPercentage: String(product.discountPercentage)});
        }
    }, [product]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0]
       if(file){
        const localURL = URL.createObjectURL(file)
        setData({...data, thumbnail: localURL})
       }
    }

    const handleSave = () => {
        const productID = product?.id;
        editProduct(
            product?{
                ...product, 
                ...data,
                id: productID, 
                price: Number(data.price), 
                discountPercentage: Number(data.discountPercentage)} as any : {...data, price: Number(data.price), discountPercentage: Number(data.discountPercentage)} as any);
                closeForm();
    }


    return (
        <AnimatePresence>
            {form === "edit" && (
                <div className="fixed inset-0 z-20">

                    <motion.div id="overlay" className="absolute inset-0 bg-black/60" onClick={ closeForm }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>

                    <motion.div className="bg-white w-[90%] h-[95%] md:w-3/5 md:h-4/5 p-5 overflow-y-auto edit-scrollbar rounded-xl font-inter fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{scale: 0.8, opacity: 0}}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-black font-semibold text-lg mb-2">Edit Product</h2>
                        <X onClick={closeForm} className="absolute top-2 right-4 cursor-pointer w-4 text-gray-600 hover:text-gray-800" />

                        {/* Image,Title,Description */}
                        <div className="px-2 flex flex-col gap-2 mb-2">
                            <label htmlFor='image-preview' className='text-sm text-gray-500 font-medium'>
                                Preview Product
                            </label>
                            {/* Image div */}
                            <div className="flex gap-2.5">
                                <img src={data.thumbnail || "/placeholder-image.jpg"} alt={data.title} className="w-48 h-48 object-contain rounded-xl border border-[hsl(220,13%,91%)] bg-gray-50" />
                                <div className="flex flex-col justify-end">
                                    <label className="bg-white border text-xs border-gray-300 rounded px-4 py-2 cursor-pointer flex items-center gap-1">
                                      <Upload className="w-4 h-4 text-gray-700" />
                                      <span>Change <span className="hidden md:block">Image</span></span>
                                      <input
                                        type="file"
                                        id="image-preview"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute w-0 h-0 opacity-0 overflow-hidden"
                                      />
                                    </label>
                                </div>
                            </div>

                            <label htmlFor='title' className='text-sm text-gray-500 font-medium'>
                                Title
                            </label>
                            <input
                                id='title'
                                required
                                type="text"
                                value={data.title}
                                onChange={(e) => setData({...data, title: e.target.value})}
                                className="h-9 w-full text-base md:text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                            />
                            <label htmlFor='description' className='text-sm text-gray-500 font-medium'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                required
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                className="h-20 w-full text-base md:text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                            />
                        </div>

                        {/* Category,Brand,Price,Discount */}
                        <div className="px-2 grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor='category' className='text-sm text-gray-500 font-medium'>
                                    Category
                                </label>
                                <input
                                    id='category'
                                    required
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData({...data, category: e.target.value})}
                                    disabled
                                    className="h-9 w-full text-base md:text-sm text-gray-500 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor='brand' className='text-sm text-gray-500 font-medium'>
                                    Brand
                                </label>
                                <input
                                    id='brand'
                                    required
                                    type="text"
                                    value={data.brand}
                                    onChange={(e) => setData({...data, brand: e.target.value})}
                                    className="h-9 w-full text-base md:text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor='price' className='text-sm text-gray-500 font-medium'>
                                    Price
                                </label>
                                <input
                                    id='price'
                                    required
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData({...data, price: e.target.value})}
                                    className="h-9 w-full text-base md:text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor='discount' className='text-sm text-gray-500 font-medium'>
                                    Discount
                                </label>
                                <input
                                    id='discount'
                                    required
                                    type="number"
                                    value={data.discountPercentage}
                                    onChange={(e) => setData({...data, discountPercentage: e.target.value})}
                                    className="h-9 w-full text-base md:text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 mt-4">
                            <Button
                                variant="none"
                                size="md"
                                className="bg-gray-200 hover:bg-gray-400"
                                onClick={closeForm}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="none"
                                size="md"
                                onClick={handleSave}
                                className="bg-gray-800 text-white shadow-2xl hover:text-black hover:bg-yellow-400"
                            >
                                Save
                            </Button>
                        </div>
                    </motion.div>

                </div>
                
            )}
        </AnimatePresence>
    )
}
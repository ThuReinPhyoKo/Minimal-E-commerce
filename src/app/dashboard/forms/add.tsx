import { AnimatePresence, motion } from "framer-motion"
import { useFormStore } from "../store/formStore"
import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useProductStore } from "../../features/products/store/productStore";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function AddForm() {

    const form = useFormStore((s) => s.form);
    const closeForm = useFormStore((s) => s.closeForm);
    const addProduct = useProductStore((s) => s.addProduct);
    const catalog = useProductStore((s) => s.catalog);

    const categories = [...new Set(Object.values(catalog).map(product => product.category))];

    const [ imagePreview, setImagePreview ] = useState<string>("");

    const [ formData, setFormData ] = useState({
        title: "",
        description: "",
        category: "all-product",
        brand: "",
        thumbnail: "",
        price: 0 as number,
        discountPercentage: 0 as number,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
           const file = e.target.files?.[0]
           if(file){
            const localURL = URL.createObjectURL(file)
            setImagePreview(localURL);
           }
        }

    const handleSave = () => {
        addProduct({
            id: 0, // This will be overridden in the store with a unique ID
            title: formData.title,
            description: formData.description,
            category: formData.category,
            brand: formData.brand,
            price: formData.price,
            discountPercentage: formData.discountPercentage,
            thumbnail: imagePreview,
            rating: 0,
            stock: 0,
            tags: [],
            sku: "",
            weight: 0,
            dimensions: {
                width: 0,
                height: 0,
                depth: 0
            },
            warrantyInformation: "",
            shippingInformation: "",
            availabilityStatus: "",
            reviews: [],
            returnPolicy: "",
            minimumOrderQuantity: 0,
            meta: {
                createdAt: "",
                updatedAt: "",
                barcode: "",
                qrCode: ""
            },
            images: []
        }as any);
        closeForm();
    }

    console.log("cat", categories )

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

                    <motion.div className="bg-white w-3/5 h-4/5 p-5 rounded-xl overflow-y-auto edit-scrollbar font-inter fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{scale: 0.8, opacity: 0}}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-black font-semibold text-lg">Add New Product</h2>
                        <X onClick={closeForm} className="absolute top-2 right-4 cursor-pointer w-4 text-gray-600 hover:text-gray-800" />
                        
                        <div className="px-2 flex flex-col gap-2 mb-2">
                            <label htmlFor='image-preview' className='text-sm text-gray-500 font-medium'>
                                Preview Product
                            </label>
                            {/* Image div */}
                            <div className="flex gap-2.5">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="product-image" className="w-48 h-48 object-contain rounded-xl border border-[hsl(220,13%,91%)] bg-gray-50" />
                                ) : (
                                    <div className="w-48 h-48 bg-gray-50 border border-[hsl(220,13%,91%)] rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                        No image selected
                                    </div>
                                )}
                                
                                <div className="flex flex-col justify-end">
                                    <label className="bg-white border text-xs border-gray-300 rounded px-4 py-2 cursor-pointer flex items-center gap-1">
                                      <Upload className="w-4 h-4 text-gray-700" />
                                      Change Image
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
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                            />
                            <label htmlFor='description' className='text-sm text-gray-500 font-medium'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="h-20 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
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
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    disabled
                                    className="h-9 w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
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
                                    value={formData.brand}
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                    className="h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
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
                                    value={formData.price === 0 ? "" : formData.price}
                                    placeholder="0"
                                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                                    className="h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
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
                                    value={formData.discountPercentage === 0 ? "" : formData.discountPercentage}
                                    placeholder="0"
                                    onChange={(e) => setFormData({...formData, discountPercentage: parseFloat(e.target.value)})}
                                    className="h-9 w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
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
"use client"
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { ArrowLeft, Users, ShoppingCart, Package, DollarSign, Plus, Trash2, SquarePen, Star } from "lucide-react";
import { UserDetails } from "../components/auth/user/userDetail";
import Image from "next/image";
import { useDashboardProducts } from "./data/getDashboardProducts";
import { mockOrders } from "./data/mockData";
import { useState } from "react";
import { useFormStore } from "./store/formStore";
import { discountPrice } from "../features/products/components/productCard";
import { useProductStore } from "../features/products/store/productStore";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "../features/products/types/wholeProduct";

export default function Dashboard() {

    const { name, profile } = UserDetails;
    const router = useRouter();

    const { data, isLoading, isError } = useDashboardProducts();
    const openForm = useFormStore((s) => s.openForm)
    const catalog = useProductStore((s) => s.catalog);
    const deleteProduct = useProductStore((s) => s.deleteProduct);
    const deletedIds = useProductStore((s) => s.deletedIds);

    const deletedIdSet = new Set(deletedIds);

    const apiProducts = new Set(data?.products.map((p) => p.id));
    const brandNewProduct = Object.values(catalog).filter((p) => p.isCustom && !apiProducts.has(p.id) && !deletedIdSet.has(p.id));
    const allProducts = [...brandNewProduct, ...(data?.products || [])].filter((p) => !deletedIdSet.has(p.id));

    const [ isProductTab, setIsProductTab ] = useState(true);
    const [ isOrderTab, setIsOrderTab ] = useState(false);

    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const [ productToDelete, setProductToDelete ] = useState<Product | null>(null);

    const toggleProductTab = () => {
        setIsProductTab(true);
        setIsOrderTab(false);
    }
    const toggleOrderTab = () => {
        setIsProductTab(false);
        setIsOrderTab(true);
    }

    const handleDelete = () => {
        deleteProduct(productToDelete!);
        setIsDeleteModalOpen(false);
    }

    const stats = [
        { id: 1, label: "Revenue", value: `$${data?.products.reduce((s, p) => s + p.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: "+12.5%", icon: DollarSign },
        { id: 2, label: "Orders", value: "156", change: "+8.2%", icon: ShoppingCart },
        { id: 3, label: "Products", value: String(data?.products.length ? data?.products.length + brandNewProduct.length : brandNewProduct.length), change: "+2", icon: Package },
        { id: 4, label: "Customers", value: "1,240", change: "+5.1%", icon: Users },
    ];

    console.log(catalog)

    return (
        <section className="min-h-screen bg-[hsl(220,13%,98%)]/50 font-inter relative">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-[hsl(220,13%,91%)]">
                <div className="max-w-6xl mx-auto px-16 h-14 flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<ArrowLeft className="text-gray-500 w-4 group-hover:text-gray-800" />}
                            iconPosition="left"
                            onClick={() => router.push("/")}
                            className="hover:bg-yellow-300 group"
                        >
                            <span className="text-gray-500 font-medium group-hover:text-gray-800">Back to Store</span>
                        </Button>
                        <div className="w-px h-5 bg-[hsl(220,13%,91%)]" />
                        <h1 className="font-semibold text-gray-900 text-sm">Admin Dashboard</h1>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center">
                        <h2 className="text-sm font-semibold text-gray-900">{name}</h2>
                        <Image src={profile} alt="Profile Picture" width={32} height={32} className="rounded-full mx-2 border border-yellow-300" />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Overview, basic metric cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    { stats.map((stat) => (
                        <div id={stat.label} key={stat.id} className="bg-[hsl(0,0%,100%)] border border-[hsl(220,13%,91%)] rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">{stat.label}</span>
                                <stat.icon size={16} className="text-gray-500" />
                            </div>
                            <p className="text-gray-800 text-2xl font-bold">{stat.value}</p>
                            <p className="text-gray-600 text-xs mt-1">
                                <span className="font-medium">{stat.change}</span> from last month
                            </p>
                        </div>
                    ))}
                </div>

                <div className="w-[142] mb-6 bg-gray-100 rounded-lg border border-[hsl(220,13%,91%)] flex items-center p-px">
                    <button className={`${isProductTab ? "text-gray-800 shadow-2xl rounded-lg bg-white" : "text-gray-400"} cursor-pointer font-medium p-2 text-sm`} onClick={toggleProductTab}>Products</button>
                    <button className={`${isOrderTab ? "text-gray-800 shadow-2xl rounded-lg bg-white" : "text-gray-400"} cursor-pointer font-medium p-2 text-sm`} onClick={toggleOrderTab}>Orders</button>
                </div>

                { isOrderTab && (
                    <div className="bg-[hsl(0,0%,100%)] rounded-lg border border-[hsl(220,13%,91%)]">
                        <div className="px-5 py-4 border-b border-[hsl(220,13%,91%)]">
                            <h2 className="text-sm font-semibold text-gray-700">Recent Orders</h2>
                        </div>
                        {mockOrders.map((i) => (
                            <div key={i.id} className="px-5 py-4 flex items-center justify-between border-b border-[hsl(220,13%,91%)]">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{i.id.slice(0,13)}</p>
                                    <p className="text-sm text-gray-500">{i.customer}</p>
                                </div>
                                <p className="text-sm text-gray-500">{i.items} {i.items > 1 ? "items" : "item"}</p>
                                <p className="text-sm text-gray-500">{i.date}</p>
                                <div className={`${i.colors} w-28 rounded-full flex items-center justify-center gap-0.5 p-1 text-xs`}>
                                    <i.icon size={14} />
                                    {i.status}
                                </div>
                                <p className="text-sm text-gray-700 font-semibold">${i.total}</p>
                            </div>
                        ))}
                    </div>
                )}
                { isProductTab && (
                    <>
                        <div className="bg-[hsl(0,0%,100%)] rounded-lg border border-[hsl(220,13%,91%)]">
                            <div className="px-5 py-4 flex items-center justify-between border-b border-[hsl(220,13%,91%)]">
                                <div className="flex items-center justify-center gap-2.5">
                                    <h2 className="text-sm font-semibold text-gray-700">
                                        All Products <span className="text-gray-600 text-xs font-medium">(18 products)</span>
                                    </h2>
                                    <div className={isLoading ? "loader-mini" : "hidden"}></div>
                                </div>
                                <Button
                                    variant="none"
                                    size="xs"
                                    icon={<Plus className="w-4 text-white" />}
                                    iconPosition="left"
                                    onClick={() => openForm("add")}
                                    className="text-white bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded-lg"
                                >
                                    Add product
                                </Button>
                            </div>

                            {isError && <div className="text-center text-sm font-medium text-gray-700">Failed to load products.</div>}
                            
                            { allProducts
                            .map((i) => {
                                const product = catalog[i.id] || i;
                                return (
                                <div key={product.id} className="px-5 py-4 grid grid-cols-3 items-center justify-between border-b border-[hsl(220,13%,91%)]">
                                    <div className="flex items-center gap-1.5">
                                        <Image src={product.thumbnail} width={40} height={40} alt="product-image" />
                                        <div>
                                            <p className="text-sm text-gray-700">{product.title}</p>
                                            <p className="text-xs text-gray-400">{product.brand}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 text-center">{product.category}</p>
                                    <div className="flex items-center justify-end gap-10">
                                        <p className="text-sm text-gray-800 font-medium">${discountPrice(product.price, product.discountPercentage)}</p>
                                        <div className="flex items-center justify-center gap-1">
                                            <Star className="fill-gray-500 stroke-0 w-3 h-3" />
                                            <p className="text-xs text-gray-700">{product.rating}</p>
                                        </div>                                        
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="transparent"
                                                size="xs"
                                                icon={<SquarePen className="w-4 text-gray-500" />}
                                                onClick={() => openForm("edit", product)}
                                                aria-label="open-form"
                                                className="hover:bg-black/10 px-1 py-0.5 rounded-lg"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                            <Button
                                                variant="transparent"
                                                size="xs"
                                                icon={<Trash2 className="w-4 text-gray-500" />}
                                                onClick={() => { setProductToDelete(product); setIsDeleteModalOpen(true); }}
                                                aria-label="delete-product"
                                                className="hover:bg-black/10 px-1 py-0.5 rounded-lg"
                                            >
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Delete Modal */}
                                    <AnimatePresence>
                                        {isDeleteModalOpen && (
                                            <motion.div id="overlay" className="absolute inset-0 bg-black/10" onClick={() => setIsDeleteModalOpen(false)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.div className="fixed inset-0 z-20 flex items-center justify-center"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{scale: 0.8, opacity: 0}}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                                >
                                                    <div className="bg-white p-5 rounded-2xl w-[500px] border border-[hsl(220,13%,91%)]">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product?</h3>
                                                        <p className="text-gray-700 font-medium mb-2">Are you sure you want to remove this item from your store?</p>
                                                        <p className="text-gray-500 text-xs mb-6">Note: This action will remove the product from your current view, but it can be restored by clearing your browser data.</p>
                                                        <div className="flex justify-end gap-3">
                                                            <Button
                                                                variant="gray"
                                                                onClick={() => setIsDeleteModalOpen(false)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                variant="main"
                                                                onClick={() => handleDelete()}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )})}
                        </div>
                    </>
                )}
            </main>
        </section>
    )
}
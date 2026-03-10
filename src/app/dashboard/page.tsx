"use client"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { ArrowLeft, Users, ShoppingCart, Package, DollarSign } from "lucide-react"
import { UserDetails } from "../components/auth/user/userDetail"
import Image from "next/image";
import { useDashboardProducts } from "./data/getDashboardProducts";
import { mockOrders } from "./data/mockData"
import { useState } from "react"

export default function Dashboard() {

    const { name, profile } = UserDetails;
    const router = useRouter();

    const { data, isLoading, isError } = useDashboardProducts();

    const [ isProductTab, setIsProductTab ] = useState(false);
    const [ isOrderTab, setIsOrderTab ] = useState(false);

    const toggleProductTab = () => {
        setIsProductTab(true);
        setIsOrderTab(false);
    }
    const toggleOrderTab = () => {
        setIsProductTab(false);
        setIsOrderTab(true);
    }

    const stats = [
        { label: "Revenue", value: `$${data?.products.reduce((s, p) => s + p.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: "+12.5%", icon: DollarSign },
        { label: "Orders", value: "156", change: "+8.2%", icon: ShoppingCart },
        { label: "Products", value: String(data?.products.length), change: "+2", icon: Package },
        { label: "Customers", value: "1,240", change: "+5.1%", icon: Users },
    ];

    return (
        <section className="min-h-screen bg-[hsl(220,13%,98%)]/50 font-inter">
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
                        <div className="bg-[hsl(0,0%,100%)] border border-[hsl(220,13%,91%)] rounded-lg p-5">
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

                    {/* {isError && <div className="text-center text-sm font-medium text-gray-700">Failed to load products.</div>}
                    {isLoading && <span className="loader"></span>}
                    { data?.products.map(i => (
                        <div key={i.id}>
                            <p>{i.title}</p>
                        </div>
                    ))} */}
                </div>

                <div className="w-[142] mb-6 bg-gray-50 rounded-lg border border-[hsl(220,13%,91%)] flex items-center p-px">
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
                        <p>Products</p>
                    </>
                )}
            </main>
        </section>
    )
}
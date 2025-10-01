'use client';
import { Tooltip } from "@mui/material";
import { Heart, Search, ShoppingCart, Truck, User } from "lucide-react";
import { Button } from "../ui/button";
import AppAutocomplete from "../ui/search";

export default function Nav() {

    return (
        <nav className="w-full p-5 flex justify-center items-center fixed top-0 z-10">
            <div id="nav-container" className="w-[95%] h-16 flex justify-between items-center">
                <div id="logo-and-login" className="bg-black/40 backdrop-blur-md border border-white/10 w-48 h-12 rounded-full flex justify-center items-center">
                    <h1 className="font-roboto text-2xl font-semibold text-gray-300">Minimal</h1>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 ml-4 mr-2"></div>
                    <Tooltip title="Login" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<User className="text-gray-300 group-hover:text-gray-700 transition-colors" />}
                            aria-label="Login"
                            className="group hover:bg-yellow-400 px-0 py-0"
                        >
                            <span className="sr-only">Login</span>
                        </Button>
                    </Tooltip>
                </div>
                <AppAutocomplete
                    options={["Shirts", "Pants", "Shoes"]}
                    freeSolo
                />
                <div id="wishlist-and-cart-and-order" className="bg-black/40 backdrop-blur-md border border-white/10 w-48 h-12 rounded-full flex items-center justify-center">
                    <Tooltip title="Wishlist" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<Heart className="text-gray-300 group-hover:text-gray-700 transition-colors" />}
                            aria-label="Wishlist"
                            className="group hover:bg-yellow-400 px-0 py-0"
                        >
                            <span className="sr-only">Wishlist</span>
                        </Button>
                    </Tooltip>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 mx-2"></div>
                    <Tooltip title="Cart" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<ShoppingCart className="text-gray-300 group-hover:text-gray-700 transition-colors" />}
                            aria-label="Cart"
                            className="group hover:bg-yellow-400 px-0 py-0"
                        >
                            <span className="sr-only">Cart</span>
                        </Button>
                    </Tooltip>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 mx-2"></div>
                    <Tooltip title="Your Orders" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<Truck className="text-gray-300 group-hover:text-gray-700 transition-colors" />}
                            aria-label="Your Orders"
                            className="group hover:bg-yellow-400 px-0 py-0"
                        >
                            <span className="sr-only">Your Orders</span>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </nav>
    )
}
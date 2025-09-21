import { Tooltip } from "@mui/material";
import { Heart, Search, ShoppingCart, Truck, User } from "lucide-react";

export default function Nav() {

    return (
        <nav className="w-full p-5 flex justify-center items-center fixed top-0 z-10">
            <div id="nav-container" className="w-[95%] h-16 flex justify-between items-center">
                <div id="logo-and-login" className="bg-black/40 backdrop-blur-md border border-white/10 w-48 h-12 rounded-full flex justify-center items-center">
                    <h1 className="font-roboto text-2xl font-semibold text-gray-300">Minimal</h1>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 ml-4 mr-3"></div>
                    <Tooltip title="Login" arrow>
                        <User className="text-gray-300" />
                    </Tooltip>
                </div>
                <div id="search-bar" className="bg-black/40 backdrop-blur-md border border-white/10 w-96 h-12 rounded-full flex items-center">
                    <Search className="text-gray-400 ml-5" />
                    <input type="text" placeholder="Search products..." className="w-full h-full bg-transparent outline-none px-3 text-gray-300 placeholder-gray-400" />
                </div>
                <div id="wishlist-and-cart-and-order" className="bg-black/40 backdrop-blur-md border border-white/10 w-48 h-12 rounded-full flex items-center justify-center">
                    <Tooltip title="Wishlist" arrow>
                        <Heart className="text-gray-300" />
                    </Tooltip>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 mx-4"></div>
                    <Tooltip title="Cart" arrow>
                        <ShoppingCart className="text-gray-300" />
                    </Tooltip>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 mx-4"></div>
                    <Tooltip title="Your Orders" arrow>
                        <Truck className="text-gray-300" />
                    </Tooltip>
                </div>
            </div>
        </nav>
    )
}
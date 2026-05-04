'use client';
import { Tooltip } from "@mui/material";
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { House, Heart, ShoppingCart, Truck, User, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import AppAutocomplete from "../../features/products/components/search";
import { useCartStore } from "@/app/features/cart/store/cartStore";
import { useWishlistStore } from "@/app/features/wishlist/store/wishlistStore";
import { useSearchSuggestions } from "@/app/features/products/api/getSearchSuggestions";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useAuthStore } from "../auth/store/authStore";
import { UserDetails } from "../auth/user/userDetail";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

interface NavProps {
    onCartOpen: () => void;
    onWishlistOpen: () => void;
    onYourOrderOpen: () => void;
    onAuthOpen?: () => void;
}

export default function Nav( { onCartOpen, onWishlistOpen, onYourOrderOpen, onAuthOpen }: NavProps ) {
    
    const pathname = usePathname();

    if(pathname === "/dashboard") return null;
    
    const { isAuthenticated } = useAuthStore();
    const { profile } = UserDetails;

    const logout = useAuthStore(state => state.logout)

    const [ query, setQuery ] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setMenuOpen(open);
    };
    
    const CartItems = useCartStore(state => state.items);
    const CartItemsTotal = CartItems.reduce((total, i) => total + i.quantity, 0)
    const WishlistItems = useWishlistStore(state => state.items);
    const WishlistItemsTotal = WishlistItems.length;

    const [ debouncedQuery ] = useDebounce(query, 300);
    const { data } = useSearchSuggestions(debouncedQuery); 

    const options = data ? data : ["laptop", "smartphone", "fragrance", "gucci", "chanel", "apple"];

    const router = useRouter();
    const searchParams = useSearchParams();
    
    function updateQuery(value: string) {
        const params = new URLSearchParams(searchParams.toString());

        if(!value) {
            params.delete("query");
        } else {
            params.set("query", value);
        }
        params.delete("category");
        params.set("page", "1");

        router.push(`/?${params.toString()}`, { scroll: false });
    }

    const handleMobileLogIn = () => {
        onAuthOpen?.();
        setMenuOpen(false);
    }

    const handleMobileWishlist = () => {
        if(!isAuthenticated) {
            toast.info("Please log in to access your wishlist.") 
            return;
        }
        onWishlistOpen();
    }
    const handleMobileCart = () => {
        if(!isAuthenticated) {
            toast.info("Please log in to access your cart.") 
            return;
        }
        onCartOpen();
    }
    const handleMobileOrders = () => {
        if(!isAuthenticated) {
            toast.info("Please log in to access your orders.") 
            return;
        }
        onYourOrderOpen();
    }
    return (
        <nav className="w-full flex justify-center items-center fixed top-0 z-10 bg-white md:bg-transparent">
            {/* Desktop nav */}
            <div id="nav-container" className="w-[95%] h-16 md:flex justify-between items-center hidden">
                
                <div id="logo-and-login" className="bg-black/40 backdrop-blur-md border border-white/10 w-48 h-12 rounded-full flex justify-center items-center">
                    {!isAuthenticated ? (
                        <>
                            <h1 className="font-roboto text-2xl font-semibold text-gray-300 ml-2">Minimal</h1>
                            <div id="divider" className="w-[1px] h-5 bg-gray-400 ml-2 mr-2"></div>
                            <Tooltip title="Login" arrow>
                                <Button
                                    variant="transparent"
                                    size="sm"
                                    icon={<User className="text-gray-300 group-hover:text-[#fff700] transition-colors" />}
                                    aria-label="Login"
                                    onClick={onAuthOpen}
                                    className="group hover:bg-gray-400 px-0 py-0"
                                >
                                    <span className="sr-only">Login</span>
                                </Button>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Image src={profile} alt="Profile Picture" width={32} height={32} className="rounded-full mx-2" />
                            <Link href="/dashboard">
                                <Tooltip title="Admin Dashboard" arrow>
                                    <Button
                                        variant="transparent"
                                        size="sm"
                                        icon={<LayoutDashboard className="text-gray-300 group-hover:text-[#fff700] transition-colors" />}
                                        aria-label="dashboard"
                                        className="mx-2 hover:bg-white/10"
                                    >
                                        <span className="sr-only">Dashboard</span>
                                    </Button>
                                </Tooltip>
                            </Link>
                            <Tooltip title="Logout" arrow>
                                <Button
                                    variant="transparent"
                                    size="sm"
                                    onClick={logout}
                                    icon={<LogOut className="text-gray-300 group-hover:text-[#fff700] transition-colors" />}
                                    aria-label="Logout"
                                    className="hover:bg-white/10"
                                >
                                    <span className="sr-only">Logout</span>
                                </Button>
                            </Tooltip>
                        </>
                    )}
                </div>

                <AppAutocomplete
                   options={options}
                   inputValue={query}
                   onInputChange={(e, value) => setQuery(value)}
                   onChange={(e, value) => typeof value === "string" &&updateQuery(value || "")}
                   onKeyDown={e => e.key === "Enter" && updateQuery(query)}
                   freeSolo
                />
                
                <div id="wishlist-and-cart-and-order" className="bg-black/40 backdrop-blur-md border border-white/10 w-48 h-12 rounded-full flex items-center justify-center">
                    <Tooltip title="Wishlist" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<Heart className="text-gray-300 group-hover:text-[#fff700] transition-colors" />}
                            aria-label="Wishlist"
                            // disabled={!isAuthenticated}
                            onClick={() => {
                                if(!isAuthenticated) {
                                    toast.info("Please log in to access your wishlist.") 
                                    return;
                                }
                                onWishlistOpen();
                            }}
                            className="group relative hover:bg-white/10 px-0 py-0"
                        >
                            <span className="sr-only">Wishlist</span>
                            <span className={`${isAuthenticated ? "" : "hidden"} absolute w-4 text-xs top-0.5 -right-0.5 bg-[#fff700] rounded-full`}>{WishlistItemsTotal}</span> {/* You can add wishlist count here if needed */}
                        </Button>
                    </Tooltip>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 mx-2"></div>
                    <Tooltip title="Cart" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<ShoppingCart className="text-gray-300 group-hover:text-[#fff700] transition-colors" />}
                            aria-label="Open cart"
                            onClick={() => {
                                if(!isAuthenticated) {
                                    toast.info("Please log in to access your cart.")
                                    return;
                                }
                                onCartOpen();
                            } }
                            className="group relative hover:bg-white/10 px-0 py-0"
                        >
                            <span className="sr-only">Cart</span>
                            <span className={`${isAuthenticated ? "" : "hidden"} absolute w-4 text-xs top-0.5 -right-0.5 bg-[#fff700] rounded-full`}>{CartItemsTotal}</span>
                        </Button>
                    </Tooltip>
                    <div id="divider" className="w-[1px] h-5 bg-gray-400 mx-2"></div>
                    <Tooltip title="Your Orders" arrow>
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<Truck className="text-gray-300 group-hover:text-[#fff700] transition-colors" />}
                            aria-label="Your Orders"
                            onClick={() => {
                                if(!isAuthenticated) {
                                    toast.info("Please log in to access your orders.")
                                    return;
                                }
                                onYourOrderOpen();
                            } }
                            className="group hover:bg-white/10 px-0 py-0"
                        >
                            <span className="sr-only">Your Orders</span>
                        </Button>
                    </Tooltip>
                </div>
            </div>

            {/* Mobile nav */}
            <div id="mobile-nav" className="md:hidden border-b border-[hsl(220,13%,91%)] flex items-center justify-between w-full h-14 px-2 bg-white backdrop-blur-lg">
                <div className="flex items-center gap-0.5">
                    <Button
                        variant="transparent"
                        size="sm"
                        icon={<Menu className="text-gray-900" />}
                        aria-label="Menu"
                        onClick={toggleDrawer(true)}
                    >
                        <span className="sr-only">menu</span>
                    </Button>
                    <h1 className="font-roboto text-2xl font-semibold text-gray-900">Minimal</h1>
                </div>
                <Drawer
                    anchor="left"
                    open={menuOpen}
                    onClose={toggleDrawer(false)}
                    // Customizing the backdrop
                    slotProps={{
                    paper: { className: "w-[280px] bg-white border-r border-gray-200 shadow-xl" },
                    backdrop: { className: "backdrop-blur-sm bg-black/20" }
                    }}
                >
                    <Box className="pt-6 px-4">
                        <h2 className="font-roboto text-xl font-semibold text-gray-900 tracking-wider">Minimal</h2>
                        <List>
                            {[
                                { text: 'Home', icon: <House size={20} />, action: () => router.push("/") },
                                { text: 'Wishlist', icon: <Heart size={20} />, action: handleMobileWishlist, count: WishlistItemsTotal },
                                { text: 'Cart', icon: <ShoppingCart size={20} />, action: handleMobileCart, count: CartItemsTotal },
                                { text: 'Orders', icon: <Truck size={20} />, action: handleMobileOrders },
                            ].map((item) => (
                                <ListItem key={item.text} disablePadding>
                                    <ListItemButton onClick={() => { item.action(); setMenuOpen(false); }}>
                                        <ListItemIcon className="min-w-[40px] text-gray-600">
                                            {isAuthenticated && item.text !== 'Orders' && item.text !== 'Home' ? (
                                                <div className="relative">
                                                    {item.icon}
                                                    <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#fff700] text-[10px] font-bold text-black border border-white">
                                                        {item.count}
                                                    </span>
                                                </div>
                                            ) : (
                                                item.icon
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} className="text-gray-900" />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider className="my-4" />
                            { !isAuthenticated ? (
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={handleMobileLogIn}>
                                            <ListItemIcon className="min-w-[40px] text-gray-600">
                                                <User size={20} />
                                            </ListItemIcon>
                                            <ListItemText>Log in / Sign up</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            ) : (
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon className="min-w-[40px] text-gray-600">
                                                <Image src={profile} alt="Profile Picture" width={32} height={32} className="rounded-full" />
                                            </ListItemIcon>
                                            <ListItemText>Suzy Fashion</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <Link href="/dashboard">
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon className="min-w-[40px] text-gray-600">
                                                    <LayoutDashboard size={20} />
                                                </ListItemIcon>
                                                <ListItemText>Admin dashboard</ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={logout}>
                                            <ListItemIcon className="min-w-[40px] text-gray-600">
                                                <LogOut size={20} />
                                            </ListItemIcon>
                                            <ListItemText>Log out</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            )}
                    </Box>
                </Drawer>
                <AppAutocomplete
                   options={options}
                   inputValue={query}
                   onInputChange={(e, value) => setQuery(value)}
                   onChange={(e, value) => typeof value === "string" &&updateQuery(value || "")}
                   onKeyDown={e => e.key === "Enter" && updateQuery(query)}
                   freeSolo
                />
            </div>
        </nav>
    )
}
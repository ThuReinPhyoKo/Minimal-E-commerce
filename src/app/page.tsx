'use client'
import Hero from "./components/hero/hero";
import Grid from "@/app/components/layout/grid";
import ProductHeader from "./components/ui/productHeader";
import Cart from "./components/ui/cart";
import Nav from "./components/layout/nav";
import React from "react";
import useCart from "./lib/useCart";
import Wishlist from "./components/ui/wishlist";
import YourOrder from "./components/ui/yourOrder";

export default function Home() {
  const [ isCartOpen, setIsCartOpen ] = React.useState(false);
  const [ isWishlistOpen, setIsWishlistOpen ] = React.useState(false);
  const [ isYourOrderOpen, setIsYourOrderOpen ] = React.useState(false);
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <>
      <main className="bg-gray-50">
        <Nav 
          onCartOpen={ () => setIsCartOpen(true)}
          onWishlistOpen={() => setIsWishlistOpen(true)}
          onYourOrderOpen={() => setIsYourOrderOpen(true)}
          cartItems={cartItems}
        />
        <Hero />
        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <Wishlist 
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
        />
        <YourOrder 
          isOpen={isYourOrderOpen}
          onClose={() => setIsYourOrderOpen(false)}
        />
        <ProductHeader />
        <Grid addToCart={addToCart} />
      </main>
    </>
  );
}

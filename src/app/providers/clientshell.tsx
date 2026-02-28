"use client"
import Nav from "../components/layout/nav";
import React from "react";
import Cart from "../features/cart/components/cart";
import Wishlist from "../features/wishlist/components/wishlist";
import YourOrder from "../features/checkout/components/yourOrder";
import Footer from "../components/layout/footer";
import Checkout from "../features/checkout/components/checkout";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import { Suspense } from "react";

export default async function ClientShell({ children }: Readonly<{ children: React.ReactNode }>) {

  const [ isCartOpen, setIsCartOpen ] = React.useState(false);
  const [ isWishlistOpen, setIsWishlistOpen ] = React.useState(false);
  const [ isYourOrderOpen, setIsYourOrderOpen ] = React.useState(false);
  const [ isCheckoutOpen, setIsCheckoutOpen ] = React.useState(false);

  const anyModalOpen = isCartOpen || isWishlistOpen || isYourOrderOpen || isCheckoutOpen;

  useLockBodyScroll(anyModalOpen);
    
  return (
    <>
        <Suspense fallback={null}>
            <Nav
                onCartOpen={ () => setIsCartOpen(true)}
                onWishlistOpen={() => setIsWishlistOpen(true)}
                onYourOrderOpen={() => setIsYourOrderOpen(true)}
            />
        </Suspense>
        <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
            }}
        />
        <Wishlist
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
        />
        <YourOrder
            isOpen={isYourOrderOpen}
            onClose={() => setIsYourOrderOpen(false)}
        />
        <Checkout 
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onYourOrderOpen={() => setIsYourOrderOpen(true)}
        />
        {children}
        <Footer />
    </>
  )

}  
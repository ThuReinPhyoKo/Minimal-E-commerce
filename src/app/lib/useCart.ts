import { useState } from "react";

export default function useCart() {
    const [ cartItems, setCartItems ] = useState<Array<{ id: number; title: string; price: number; quantity: number, discountPercentage: number, thumbnail: string }>>([]);

    const addToCart = (product: { id: number; title: string; price: number, discountPercentage: number, thumbnail: string }) => {
        setCartItems((prev) => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                return prev.map(item => item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }

            return [ ...prev, {...product, quantity: 1 } ];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter(item => item.id !== productId));
    }

    const increaseQuantity = (productId: number) => {
        setCartItems((prev) => prev.map(item => item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
    }

    const decreaseQuantity = (productId: number) => {
        setCartItems((prev) => prev.map(item => item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0));
    }

    return { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity };

    
}
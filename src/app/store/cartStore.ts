import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "../types/cart";

export const useCartStore = create<CartStore>()(
    
    persist(
        (set)=> ({
            items: [],
            
            addToCart: (item) => set((state) => {
                const existingItem = state.items.find(prev => prev.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map(prev => prev.id === item.id 
                            ? { ...prev, quantity: prev.quantity + 1 }
                            : prev
                        )
                    };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }) ,

            removeFromCart: (itemId) => set((state) => ({
                items: state.items.filter(item => item.id !== itemId)
            })),

            increaseQuantity: (itemId) => set((state) => ({
                items: state.items.map(item => 
                    item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
                )
            })),

            decreaseQuantity: (itemId) => set((state) => ({
                items: state.items.map(item => 
                    item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
                ).filter(item => item.quantity > 0)
            })),

            clearCart: () => set({ items: [] }),
        }),
        { name: "cart-storage" }
    )
)
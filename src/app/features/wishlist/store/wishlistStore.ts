import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistStore } from "../types/wishlist";
import { useCartStore } from "../../cart/store/cartStore";

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToWishlist: (item) => set((state) => {
                const existingItem = state.items.find(prev => prev.id === item.id);
                if(existingItem) return state 
                return {items: [...state.items, item]}
            }),

            removeFromWishlist: (itemId) => set((state) => ({
                items: state.items.filter(item => item.id !== itemId)
            })),

            clearWishlist: () => set({ items: [] }),

            addAllToCart: () => {
                const items = get().items;
                const addToCart = useCartStore.getState().addToCart;

                items.forEach((item) => { addToCart(item) })
            }
        }),
        {name: "wishlist-storage"}
    )
)
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { order, orderStore } from "../types/order";

export const useYourOrdersStore = create<orderStore>()(
    persist(
        (set) => ({
            orders: [],

            createOrder: (cartItems, total) => {
                const newOrder: order = {
                    id: crypto.randomUUID(),
                    items: cartItems,
                    total,
                    createdAt: new Date().toISOString(),
                    status: "Shipped"
                }
                set((state) => {
                    return { orders: [...state.orders, newOrder] }
                })
            }
        })
        , {
            name: "order-storage",
            storage: createJSONStorage(() => sessionStorage),
          }
    )
)


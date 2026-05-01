import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { order, orderStore } from "../types/order";
import { generateUUID } from "@/app/utils/uuid";

export const useYourOrdersStore = create<orderStore>()(
    persist(
        (set) => ({
            orders: [],

            createOrder: (cartItems, total) => {
                const newOrder: order = {
                    id: generateUUID(),
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


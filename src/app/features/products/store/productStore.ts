import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types/wholeProduct";

interface ProductStoreType {
    catalog: Record<number, Product>;
    deletedIds?: number[];
    hydrateCatalog: (products: Product[]) => void;
    editProduct: (editedProduct: Product) => void;
    deleteProduct: (deletedProduct: Product) => void;
}

export const useProductStore = create<ProductStoreType>() (
    persist(
        (set) => ({
            catalog: {},
            deletedIds: [],

            hydrateCatalog: (products) => 
            set((state) => {
                const newCatalog = {...state.catalog};
                products.forEach((incomingProduct) => {
                    if(!newCatalog[incomingProduct.id]?.isCustom) {
                        newCatalog[incomingProduct.id] = {
                            ...incomingProduct, isCustom: false,
                        }
                    }
                })
                return {catalog: newCatalog}
            }),

            editProduct: (editedProduct) =>
            set((state) => {
                const newCatalog = {...state.catalog};
                newCatalog[editedProduct.id] = {...editedProduct, isCustom: true};
                return {catalog: newCatalog}
            }),

            deleteProduct: (deletedProduct) => 
            set((state) => {
                const { [deletedProduct.id]: _, ...newCatalog } = state.catalog;
                const newDeletedIds = state.deletedIds ? [...state.deletedIds, deletedProduct.id] : [deletedProduct.id]
                return {catalog: newCatalog, deletedIds: newDeletedIds};
            })
        }),
        {
            name: "product-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)
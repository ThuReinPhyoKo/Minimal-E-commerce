import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types/wholeProduct";

interface ProductStoreType {
    catalog: Record<number, Product>;
    deletedIds?: number[];
    hydrateCatalog: (products: Product[]) => void;
    editProduct: (editedProduct: Product) => void;
    deleteProduct: (deletedProduct: Product) => void;
    addProduct: (newProduct: Product) => void;
}

export const useProductStore = create<ProductStoreType>() (
    persist(
        (set) => ({
            catalog: {},
            deletedIds: [],

            // Reconciles API data with local state to ensure 
            // user-edited products aren't overwritten by stale responses.
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
                newCatalog[editedProduct.id] = {
                    ...editedProduct, 
                    isCustom: true,
                    isNew: newCatalog[editedProduct.id]?.isNew || false,
                };
                return {catalog: newCatalog}
            }),

            deleteProduct: (deletedProduct) => 
            set((state) => {
                const { [deletedProduct.id]: _, ...newCatalog } = state.catalog;
                const newDeletedIds = state.deletedIds ? [...state.deletedIds, deletedProduct.id] : [deletedProduct.id]
                return {catalog: newCatalog, deletedIds: newDeletedIds};
            }),

            addProduct: (newProduct) =>
            set((state) => {
                const newCatalog = {...state.catalog};
                const newId = Date.now(); // Using timestamp as a simple unique ID generator
                newCatalog[newId] = {...newProduct, id: newId, isCustom: true, isNew: true};
                return {catalog: newCatalog};
            })
        }),
        {
            name: "product-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./formStore";

type ModifiedProductsType = {
    modifiedProducts: ProductType[];
}

export const useModifiedProducts = create<ModifiedProductsType>() (
    persist (
        (set) => ({
            modifiedProducts: []
        })
        ,
        {name: "dashboard-products-edits"}
    )
)
import { create } from "zustand";

type FormType = "edit" | "add" | null;

export type ProductType = {
    id: number;
    title: string;
    price: number;
    brand: string;
    discountPercentage: number;
    thumbnail: string;
    description: string;
    category: string;
}

type FormState = {
    form: FormType;
    product: ProductType | null;
    openForm: (form: FormType, product?: ProductType) => void;
    closeForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
    form: null,
    product: null,
    openForm: (form, product?: ProductType) => set({form, product : product ?? null}),
    closeForm: () => set({form: null})
}))
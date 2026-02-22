"use client"
import CategoryList from "@/app/features/products/data/categoryList";
import ProductsList from "@/app/features/products/data/productList";
import SortProducts from "@/app/features/products/components/sortProducts";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Grid() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryFromUrl = searchParams.get("category")|| undefined;
    const page = Number(searchParams.get("page") || 1);

    const [ selectedCategory, setSelectedCategory ] = useState(categoryFromUrl);

    useEffect(() => {
        setSelectedCategory(categoryFromUrl);
    }, [categoryFromUrl]);

    function updateParams(newCategory?: string, newPage?: number) {
      const params = new URLSearchParams(searchParams.toString());

      if (newCategory === undefined) {
        params.delete("category");     // remove category
        params.set("page", "1");       // reset page
      } else {
        params.set("category", newCategory);
        params.set("page", "1");
      }

      if (newPage !== undefined) {
        params.set("page", String(newPage));
      }

      router.push(`/?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="w-full h-auto flex">
            <div className="flex flex-col">
                <SortProducts />
                <CategoryList 
                    selectedCategory={selectedCategory}
                    onSelectedCategory={(c) => updateParams(c)} />
            </div>
            <ProductsList
                page={page}
                onPageChange={(p) => updateParams(selectedCategory, p)}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}

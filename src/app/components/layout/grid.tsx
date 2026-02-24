"use client"
import CategoryList from "@/app/features/products/data/categoryList";
import ProductsList from "@/app/features/products/data/productList";
import SortProducts from "@/app/features/products/components/sortProducts";
import { useRouter, useSearchParams } from "next/navigation";

export default function Grid() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const category = searchParams.get("category")|| undefined;
    const page = Number(searchParams.get("page") || 1);
    const sortBy = searchParams.get("sortBy") || undefined;
    const order = searchParams.get("order") as "asc" | "desc" | undefined;

    function updateParams(
      newCategory?: string, 
      newPage?: number, 
      newSortBy?: string | null, 
      newOrder?: "asc" | "desc" | null
    ) {
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

      // only update sort params if explicitly provided
      if (newSortBy !== undefined) {
        if (newSortBy === null) params.delete("sortBy");
        else params.set("sortBy", newSortBy);
      }

      if (newOrder !== undefined) {
        if (newOrder === null) params.delete("order");
        else params.set("order", newOrder);
      }

      router.push(`/?${params.toString()}`, { scroll: false });
    }

    return (
        <div id="browse-products" className="w-full h-auto flex">
            <div className="flex flex-col">
                <SortProducts 
                  sortBy={sortBy}
                  order={order}
                  onSortChange={(s, o) => updateParams( category, undefined, s, o)}
                />
                <CategoryList 
                    selectedCategory={category}
                    onSelectedCategory={(c) => updateParams(c)} 
                />
            </div>
            <ProductsList
                sortBy={sortBy}
                order={order}
                page={page}
                onPageChange={(p) => updateParams(category, p)}
                selectedCategory={category}
            />
        </div>
    );
}

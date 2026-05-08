'use client'
import { Layers, ChevronDown } from "lucide-react";
import { useCategories } from "../api/getCategories";
import { Button } from "../../../components/ui/button";

export const formatCategoryName = (category: string) => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type CategoryListProps = {
  selectedCategory?: string;
  onSelectedCategory: (category: string | undefined) => void
}

export default function CategoryList({ selectedCategory, onSelectedCategory }: CategoryListProps) {
  const { data, isLoading, isError } = useCategories();

  return (
    <div className="mx-4 font-inter w-full">
      {/* --- MOBILE DROPDOWN (Shown on small screens) --- */}
      <div className="md:hidden relative w-full mb-4 flex items-center gap-2">
        <Layers className="text-gray-600 w-8 h-8" />
        <select 
          className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg appearance-none text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={selectedCategory || ""}
          onChange={(e) => onSelectedCategory(e.target.value === "" ? undefined : e.target.value)}
        >
          <option value="">All Products</option>
          {data?.map((category) => (
            <option key={category} value={category}>
              {formatCategoryName(category)}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute bg-white right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
      </div>

      {/* --- DESKTOP SIDEBAR (Hidden on mobile) --- */}
      <div className="hidden md:block w-60 h-[520px] p-4 border border-gray-200 rounded-lg bg-white">
        <div className="flex items-center mb-3 space-x-2">
          <Layers className="text-gray-600" />
          <h3 className="text-gray-600 text-lg">Categories</h3>
        </div>
        <div className="overflow-auto mb-2 max-h-[450px] category-list flex flex-col">
          <Button
            className={`${selectedCategory === undefined ? "bg-yellow-300" : "hover:text-yellow-500"} mx-2.5 text-gray-500 justify-start`}
            variant="transparent"
            size="sm"
            onClick={() => onSelectedCategory(undefined)}
          >
            All Products
          </Button>

          {isLoading && <p className="mt-5 text-gray-500 px-4 text-sm">Loading...</p>}
          {isError && data?.length === 0 ? <p className="mt-5 text-gray-500 px-4 text-sm">Error loading</p> : null}

          {data?.map((category) => (
            <Button
              key={category}
              className={`${selectedCategory === category ? "bg-yellow-300" : "hover:text-yellow-500"} mx-2.5 text-gray-500 justify-start`}
              variant="transparent"
              size="sm"
              onClick={() => onSelectedCategory(category)}
            >
              {formatCategoryName(category)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
'use client'
import { Layers } from "lucide-react";
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
    <div className="w-60 h-[520px] mx-4 p-4 border border-gray-200 rounded-lg bg-white font-inter">
      <div className="flex items-center mb-3 space-x-2">
        <Layers className="text-gray-600" />
        <h3 className="text-gray-600 text-lg">Categories</h3>
      </div>
      <div  className="overflow-auto mb-2 max-h-[450px] category-list">
        <Button
          className={`${selectedCategory === undefined ? "bg-yellow-300" : "hover:text-yellow-500"} mx-2.5 text-gray-500`}
          variant="transparent"
          size="sm"
          onClick={() => onSelectedCategory(undefined)}
        >
          All Products
        </Button>

        { isLoading && <p className="mt-5 text-gray-500">Loading categories...</p>}
        { isError && <p className="mt-5 text-gray-500">Error loading categories</p>}

        {data?.map((category) => (   
          <Button
          className={`${selectedCategory === category ? "bg-yellow-300" : "hover:text-yellow-500"} mx-2.5 text-gray-500`}
          key={category}
          variant="transparent"
          size="sm"
          onClick={ () => onSelectedCategory(category)}
          >
              {formatCategoryName(category)}
          </Button>
        ))}
      </div>
    </div>
  );
}

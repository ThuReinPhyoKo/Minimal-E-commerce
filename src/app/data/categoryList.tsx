'use client'
import { Layers } from "lucide-react";
import { useCategories } from "../lib/getCategories";
import { Button } from "../components/ui/button";

export const formatCategoryName = (category: string) => {
  return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

export default function CategoryList() {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error fetching categories</p>;



  return (
    <div className="w-60 h-[520px] mx-4 p-4 border rounded-lg bg-white">
      <div className="flex items-center mb-3 space-x-2">
        <Layers className="text-gray-600" />
        <h3 className="text-gray-600 text-lg">Categories</h3>
      </div>
      <div  className="overflow-auto mb-2 max-h-[450px] category-list">
        {data?.map((category) => (   
          <Button className="hover:text-yellow-500 mx-2.5 text-gray-500"
          key={category}
          variant="transparent"
          size="sm"
          >
              {formatCategoryName(category)}
          </Button>
        ))}
      </div>
    </div>
  );
}

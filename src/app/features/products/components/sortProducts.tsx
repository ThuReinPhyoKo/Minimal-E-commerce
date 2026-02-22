import { SlidersHorizontal } from "lucide-react"

export default function SortProducts() {
    return (
        <div className="w-60 mt-8 mb-3 mx-4 p-4 border rounded-lg bg-white font-inter">
            <div className="flex items-center mb-3 space-x-2">
                <SlidersHorizontal className="text-gray-600" />
                <h3 className="text-gray-600 text-lg">Sort By</h3>
            </div>
            
            <label htmlFor="sort-az" className="flex items-center p-2 cursor-pointer">
              <input
                id="sort-az"
                name="sort"
                type="radio"
                defaultChecked
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-400 checked:ring-1 checked:ring-gray-400 checked:ring-offset-2"
              />
              <span className="ml-2 text-gray-900 text-sm">A - Z</span>
            </label>

            <label htmlFor="sort-price-asc" className="flex items-center p-2 cursor-pointer">
              <input
                id="sort-price-asc"
                name="sort"
                type="radio"
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-400"
              />
              <span className="ml-2 text-gray-900 text-sm">Price: Low to High</span>
            </label>

            <label htmlFor="sort-price-desc" className="flex items-center p-2 cursor-pointer">
              <input
                id="sort-price-desc"
                name="sort"
                type="radio"
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-400"
              />
              <span className="ml-2 text-gray-900 text-sm">Price: High to Low</span>
            </label>

            <label htmlFor="sort-rating" className="flex items-center p-2 cursor-pointer">
              <input
                id="sort-rating"
                name="sort"
                type="radio"
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-400"
              />
              <span className="ml-2 text-gray-900 text-sm">Rating</span>
            </label>
        </div>
    )
}
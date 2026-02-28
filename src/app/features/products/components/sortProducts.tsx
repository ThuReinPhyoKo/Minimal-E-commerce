import { SlidersHorizontal, ChevronDown } from "lucide-react"

type SortProductsProps = {
  sortBy?: string | null;
  order?: "asc" | "desc" | null;
  onSortChange: (sortBy?: string | null, order?: "asc" | "desc" | null) => void;
}

export default function SortProducts({sortBy, order, onSortChange}: SortProductsProps) {

  const current = sortBy && order ? `${sortBy}-${order}` : "default";

    return (
      <>
        <div className="relative w-36 mx-4 block md:hidden">
          <select 
            className="w-full p-1 border rounded-md appearance-none font-inter text-xs text-gray-900"
            value={current}
            onChange={(e) => {
              const value = e.target.value

              if(value === "default"){
                onSortChange(null, null)
                return;
              }

              const [ sortBy, order ] = value.split("-") as [string, "asc" | "desc"]

              onSortChange(sortBy, order)
            }}
          >
            <option value="default">Default</option>
            <option value="title-asc">A - Z</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating</option>
          </select>
          <ChevronDown className="absolute w-4 h-4 right-1 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-900" />
        </div>

        <div className="w-60 mt-8 mb-3 mx-4 p-4 border border-gray-200 rounded-lg bg-white font-inter hidden md:block">
          <div className="flex items-center mb-3 space-x-2">
              <SlidersHorizontal className="text-gray-600" />
              <h3 className="text-gray-600 text-lg">Sort By</h3>
          </div>

          <label htmlFor="default" className="flex items-center p-2 cursor-pointer">
            <input
              id="default"
              name="sort"
              type="radio"
              checked={ current === "default"}
              onChange={() => onSortChange(null, null)}
              className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
            />
            <span className="ml-2 text-gray-900 text-sm">Default</span>
          </label>
          
          <label htmlFor="sort-az" className="flex items-center p-2 cursor-pointer">
            <input
              id="sort-az"
              name="sort"
              type="radio"
              checked={ current === "title-asc"}
              onChange={() => onSortChange("title", "asc")}
              className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
            />
            <span className="ml-2 text-gray-900 text-sm">A - Z</span>
          </label>

          <label htmlFor="sort-price-asc" className="flex items-center p-2 cursor-pointer">
            <input
              id="sort-price-asc"
              name="sort"
              type="radio"
              checked={ current === "price-asc"}
              onChange={() => onSortChange("price", "asc")}
              className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
            />
            <span className="ml-2 text-gray-900 text-sm">Price: Low to High</span>
          </label>

          <label htmlFor="sort-price-desc" className="flex items-center p-2 cursor-pointer">
            <input
              id="sort-price-desc"
              name="sort"
              type="radio"
              checked={ current === "price-desc"}
              onChange={() => onSortChange("price", "desc")}
              className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
            />
            <span className="ml-2 text-gray-900 text-sm">Price: High to Low</span>
          </label>

          <label htmlFor="sort-rating" className="flex items-center p-2 cursor-pointer">
            <input
              id="sort-rating"
              name="sort"
              type="radio"
              checked={ current === "rating-desc"}
              onChange={() => onSortChange("rating", "desc")}
              className="appearance-none w-4 h-4 border border-gray-400 rounded-full cursor-pointer checked:bg-yellow-300"
            />
            <span className="ml-2 text-gray-900 text-sm">Rating</span>
          </label>
        </div>
      </>
    )
}
import CategoryList from "@/app/data/categoryList";
import ProductsList from "@/app/data/productList";
import SortProducts from "@/app/data/sortProducts";


export default function Grid({ addToCart }: { addToCart: (product: { id: number; title: string; price: number; discountPercentage: number; thumbnail: string; rating: number }) => void }) {
    return (
        <div className="w-full h-auto flex">
            <div className="flex flex-col">
                <SortProducts />
                <CategoryList />
            </div>
            <ProductsList addToCart={addToCart} />
        </div>
    );
}

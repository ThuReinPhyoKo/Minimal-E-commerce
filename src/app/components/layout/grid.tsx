import CategoryList from "@/app/data/categoryList";
import ProductsList from "@/app/data/productList";
import SortProducts from "@/app/data/sortProducts";


export default function Grid() {
    return (
        <div className="w-full h-auto flex">
            <div className="flex flex-col">
                <SortProducts />
                <CategoryList />
            </div>
            <ProductsList />
        </div>
    );
}

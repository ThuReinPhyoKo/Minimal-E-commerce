import { Product } from "./wholeProduct";

export type ProductsResponse = {
    products: Product[],
    total: number,
    limit: number,
    skip: number,
}
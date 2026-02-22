import axios from "axios";
import { ProductsResponse } from "../types/productResponse";

export const fetchByCategory = async (category: string, page: number): Promise<ProductsResponse> => {
    const limit = 16; // Number of products per page
    const skip = (page - 1) * 16; // Calculate the number of products to skip

    const { data } = await axios.get(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    return data
}


import axios from "axios";
import { ProductsResponse } from "../types/productResponse";
import { useQuery } from "@tanstack/react-query";

export const fetchBySearch = async (query: string, page: number, sortBy?: string, order?: string): Promise<ProductsResponse> => {
    const limit = 16;
    const skip = (page - 1) * limit;

    const { data } = await axios.get<ProductsResponse>(
        `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`,
        {
      params: (sortBy && order ? { sortBy, order } : {})
    }
    )

    return data;
}

export const useSearchProducts = (query: string, page: number, sortBy?: string, order?: string) => {
    return useQuery<ProductsResponse>({
        queryKey: ["search products", query, page, sortBy, order],
        queryFn: () => fetchBySearch(query, page, sortBy, order),
        staleTime: 5 * 60 * 1000,
    })
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductsResponse } from "../../features/products/types/productResponse";

const fetchDashboardProducts = async(): Promise<ProductsResponse> => {
    const { data } = await axios.get<ProductsResponse>(
        "https://dummyjson.com/products?limit=18&skip=171"
    )

    return data;
}

export const useDashboardProducts = () => {
    return useQuery<ProductsResponse>({
        queryKey: ["Fashion Products"],
        queryFn: () => fetchDashboardProducts(),
        staleTime: 5 * 6 * 1000
    })
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductsResponse } from "../../features/products/types/productResponse";
import { useProductStore } from "../../features/products/store/productStore";
import { useEffect } from "react";

const fetchDashboardProducts = async(): Promise<ProductsResponse> => {
    const { data } = await axios.get<ProductsResponse>(
        "https://dummyjson.com/products?limit=18&skip=171"
    )

    return data;
}

export const useDashboardProducts = () => {

    const hydrateCatalog = useProductStore(state => state.hydrateCatalog);

    const query = useQuery<ProductsResponse>({
        queryKey: ["Fashion Products"],
        queryFn: () => fetchDashboardProducts(),
        // staleTime: 5 * 6 * 1000
    })

    useEffect(() => {
        if(query.data?.products){
            hydrateCatalog(query.data.products)
        }
    }, [query.data, hydrateCatalog])

    return query;
}

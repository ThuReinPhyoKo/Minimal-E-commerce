import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetchSearchSuggestions = async(query: string) => {

    const random = Math.random() * 100
    const limit = 16;
    const skip = Math.floor(random);

    if (!query) {
        const { data } = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        return data.products.map((p: {title: string}) => p.title)
    };

    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
    return data.products.map((p: {title: string}) => p.title);
}

export const useSearchSuggestions = (query: string) => {
    return useQuery({
        queryKey: ["search suggestions", query],
        queryFn: () => fetchSearchSuggestions(query),
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
    })
}
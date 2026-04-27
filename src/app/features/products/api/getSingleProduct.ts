import axios from 'axios'
import { Product } from '../types/wholeProduct';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';

const fetchSingleProduct = async(id: string): Promise<Product> => {
    const {data} = await axios.get<Product>(
        `https://dummyjson.com/products/${id}`
    );
    return data;
}

export const useSingleProduct = (id: string) => {
    
    const hydrateCatalog = useProductStore(state => state.hydrateCatalog)
    // const catalog = useProductStore(state => state.catalog)
    // const localProduct = catalog[Number(id)];

    const query = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: () => fetchSingleProduct(id),
        enabled: !!id, // Only run the query if id is truthy
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    useEffect(() => {
        if(query.data){
            hydrateCatalog([query.data])
        }
    }, [query.data, hydrateCatalog])

    return query;
}
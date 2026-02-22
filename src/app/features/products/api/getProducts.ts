import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProductsResponse } from '../types/productResponse';
import { fetchByCategory } from './getByCategory';

export const fetchProducts = async (page: number): Promise<ProductsResponse> => {
  const limit = 16; // Number of products per page
  const skip = (page - 1) * limit; // Calculate the number of products to skip

  const {data} = await axios.get<ProductsResponse>(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  
  // if(page === 3) {
  //   throw new Error('Simulated error on page 3');
  // }

  return data;
};

export const useProducts = (page: number, category?: string) => {
    return useQuery<ProductsResponse>({
    queryKey: ['products', category?? "all", page],
    queryFn: () => {
      if(category) {
        return fetchByCategory(category, page);
      } 
      return fetchProducts(page)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
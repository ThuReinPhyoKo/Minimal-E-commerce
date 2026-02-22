'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type CategoriesResponse = string[];

const fetchCategories = async (): Promise<CategoriesResponse> => {
  const {data} = await axios.get<CategoriesResponse>(
    'https://dummyjson.com/products/category-list'
  );
  return data;
};

export const useCategories = () => {
    return useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};
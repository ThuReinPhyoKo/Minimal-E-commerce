'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Product type 
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

// API response type
export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const fetchProducts = async (page: number): Promise<ProductsResponse> => {
  const limit = 16; // Number of products per page
  const skip = (page - 1) * limit; // Calculate the number of products to skip

  const {data} = await axios.get<ProductsResponse>(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  
  return data;
};

const initialData = await fetchProducts(1);

export const useProducts = (page: number) => {
    return useQuery<ProductsResponse>({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
    initialData: page === 1 ? initialData : undefined, // InitialData for the first page
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
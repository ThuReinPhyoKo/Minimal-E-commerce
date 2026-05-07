"use client";
import React, { useRef, useEffect } from "react";
import { useProducts } from "../api/getProducts";
import ProductCard from "../components/productCard";
import { Pagination, Skeleton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/mui-theme";
import Image from "next/image";
import Link from "next/link";
import { useSearchProducts } from "../api/getBySearch";
import { useStoreReady } from "@/app/hooks/useStoreReady";
import { useProductStore } from "../store/productStore";

type ProductsListProps = {
  selectedCategory ?: string;
  page : number;
  onPageChange : (page: number) => void; 
  sortBy?: string;
  order?: "asc" | "desc";
  query?: string;
}

export default function ProductsList({selectedCategory, query, page, onPageChange, sortBy, order}: ProductsListProps) {

  const { 
    data, 
    isLoading, 
    isFetching, 
    isError } = query 
              ? useSearchProducts(query, page, sortBy, order)
              : useProducts(page, selectedCategory, sortBy, order);

  const productRef = useRef<HTMLElement | null>(null);
  const isFirstRender = useRef(true);
  const isReady = useStoreReady();
  const catalog = useProductStore(state => state.catalog);
  const deletedIds = useProductStore(state => state.deletedIds);
  const deletedIdSet = new Set(deletedIds);

  const apiProducts = new Set(data?.products.map((p) => p.id));
  
  // Only show new products on page 1, either in "all products" view or in search results when title matches
  const isPageOne = page === 1;
  const isViewingAllProducts = !selectedCategory || selectedCategory === "all-products";
  const isSearching = !!query;
  
  const brandNewProduct = isPageOne 
    ? Object.values(catalog).filter((p) => {
        if (!p.isNew || apiProducts.has(p.id) || deletedIdSet.has(p.id)) return false;
        
        // In "all products" view: show all new products
        if (isViewingAllProducts && !isSearching) return true;
        
        // In search: only show if title matches query
        if (isSearching) {
          return p.title.toLowerCase().includes(query.toLowerCase());
        }
        
        return false;
      })
    : [];
    
  const allProducts = [...brandNewProduct, ...(data?.products || [])].filter((p) => !deletedIdSet.has(p.id));

  useEffect(() => {
      if ( isFirstRender.current && !query ) {
        isFirstRender.current = false;
        return;
      } 
      productRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [ page, selectedCategory, query]);

  

  return (
    <section ref={productRef} className="md:my-8 flex flex-col items-center justify-between scroll-mt-20 w-full">

      {isError ? (
        <div className="mb-4 w-full h-3/5 flex flex-col items-center justify-center">
          <Image
            src="/error.png"
            alt="Error Icon"
            width={400}
            height={200}
          />
          <p className="text-lg font-inter font-medium text-gray-800">Oops! Failed to load products.</p>
          <p className="font-inter text-gray-600">Please check your connection or try again.</p>
        </div>
      ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2 md:p-0">
        { isLoading || isFetching || !isReady ? (
          Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-64 h-80">
              <Skeleton variant="rectangular" width={256} height={256} animation="wave" />
              <Skeleton variant="text" width={200} height={30} animation="wave" className="mt-2" />
              <Skeleton variant="text" width={130} height={20} animation="wave" className="mt-1" />
              <Skeleton variant="text" width={150} height={20} animation="wave" className="mt-1" />
            </div>
          ))
        ) : (
          allProducts
          .map((apiItem) => {
            const product = catalog[apiItem.id] || apiItem;
            return (
            <Link href={`/category/${product.category}/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          )})
        )}
      </div>
      )}
      { allProducts.length === 0 && !isError ? (
        <div className="w-full h-80 flex flex-col items-center justify-center">
          <p className="font-inter mb-2 text-base md:text-lg text-gray-600">No matches found.</p>
          <p className="font-inter text-sm md:text-base text-gray-500">Try searching different keywords.</p>
        </div>
      ) : null }
      <ThemeProvider theme={theme}>
        <Pagination 
          count={data ? Math.ceil(data.total / 16) : 1} // Assuming 16 products per page
          color="secondary"
          page={page}
          onChange={(_, value) => onPageChange(value)}
          className="my-8"
        />
      </ThemeProvider>

    </section>
  )
}
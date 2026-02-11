"use client";
import React, { useRef, useEffect } from "react";
import { useProducts } from "../lib/getProducts";
import ProductCard from "../components/ui/productCard";
import { Pagination, Skeleton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/mui-theme";
import Image from "next/image";
import Link from "next/link";


export default function ProductsList() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isFetching, isError } = useProducts(page);

  const productRef = useRef<HTMLElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    productRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [ data, isLoading, isFetching]);

  return (
    <section ref={productRef} className="my-8 flex flex-col items-center justify-between scroll-mt-20 w-full">

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
      <div className="grid grid-cols-4 gap-3">
        { isLoading || isFetching ? (
          Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-64 h-80">
              <Skeleton variant="rectangular" width={256} height={256} animation="wave" />
              <Skeleton variant="text" width={200} height={30} animation="wave" className="mt-2" />
              <Skeleton variant="text" width={130} height={20} animation="wave" className="mt-1" />
              <Skeleton variant="text" width={150} height={20} animation="wave" className="mt-1" />
            </div>
          ))
        ) : (
          data?.products.map((product) => (
            <Link href={`/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
      )}
      <ThemeProvider theme={theme}>
        <Pagination 
          count={13} // Assuming 16 products per page
          color="secondary"
          page={page}
          onChange={(_, value) => setPage(value)}
          className="my-8"
        />
      </ThemeProvider>

    </section>
  )
}


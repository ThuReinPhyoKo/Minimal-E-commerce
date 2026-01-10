"use client";
import React, { useRef, useEffect } from "react";
import { useProducts } from "../lib/getProducts";
import ProductCard from "../components/ui/productCard";
import { Pagination } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/mui-theme";


export default function ProductsList({addToCart}: { addToCart: (product: { id: number; title: string; price: number; discountPercentage: number; thumbnail: string; rating: number }) => void }) {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError } = useProducts(page);

  const productRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    productRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [page]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products</p>;

  return (
    <section ref={productRef} className="my-8 flex flex-col items-center justify-center">
      
      <div className="grid grid-cols-4 gap-3">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      <ThemeProvider theme={theme}>
        <Pagination 
          count={Math.ceil((data?.total || 0) / 16)} // Assuming 16 products per page
          color="secondary"
          page={page}
          onChange={(_, value) => setPage(value)}
          className="my-8"
        />
      </ThemeProvider>

    </section>
  )
}


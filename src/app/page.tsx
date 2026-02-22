import Hero from "./components/hero/hero";
import Grid from "./components/layout/grid";
import ProductHeader from "./features/products/components/productHeader";

export default function Home() {
  
  return (
    <>
      <main className="bg-gray-50">
        <Hero />
        <ProductHeader />
        <Grid />
      </main>
    </>
  );
}

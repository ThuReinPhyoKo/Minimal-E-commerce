import Hero from "./components/hero/hero";
import Grid from "./components/layout/grid";
import ProductHeader from "./features/products/components/productHeader";
import { connection } from "next/server";

export default async function Home() {
  await connection();

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

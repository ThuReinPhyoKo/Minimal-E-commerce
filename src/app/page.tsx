import Hero from "./components/hero/hero";
import Grid from "@/app/components/layout/grid";

export default function Home() {
  
  return (
    <>
      <main className="bg-gray-50">
        <Hero />
        <Grid />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import ClientShell from "./providers/clientshell";
import { Toaster } from "sonner"

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minimal Essentials",
  description: "Scalable user based e-commerce application with Admin Dashboard and functional CRUD operations built as a portfolio project by ThuReinPhyoKo, Ryan",
  openGraph: {
    title: "Minimal Essentials",
    description: "Scalable user based e-commerce application with Admin Dashboard and functional CRUD operations built as a portfolio project by ThuReinPhyoKo, Ryan",
    url: "https://minimal-mart.vercel.app",
    images: [
      {
        url: "https://minimal-mart.vercel.app/minimal-og.png",
        width: 1200,
        height: 630,
        alt: "Minimal Essentials"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimal Essentials",
    description:
      "Scalable user based e-commerce application with Admin Dashboard and functional CRUD operations built as a portfolio project by ThuReinPhyoKo, Ryan",
    images: ["https://minimal-mart.vercel.app/minimal-og.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <ClientShell>
          {children}
          <Toaster position="bottom-right" richColors />
          </ClientShell>
        </QueryClientProvider>
      </body>
    </html>
  );
}

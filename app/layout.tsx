import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Cart } from "@/pages/Cart"; // We will adapt Cart to be a component used in layout
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "EZCENTIALS | Luxusmode & Eleganz",
  description: "Eleganz neu definiert. Entdecken Sie die feinste Kollektion luxuriöser Mode für den Winter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-white text-brand-black antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          {/* Cart is a global modal/drawer managed by context, so it lives here */}
          <Cart /> 
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
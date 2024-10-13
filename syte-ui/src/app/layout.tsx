import type { Metadata } from "next";
import "./globals.css";
import { CatalogsProvider } from "./contexts/catalogs-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CatalogsProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </CatalogsProvider>
  );
}

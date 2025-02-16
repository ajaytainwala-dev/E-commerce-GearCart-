
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { AppProvider } from "./ContextAPI/AppContext";
import type {Metadata}  from "next";
import AppBar from "@/components/AppBar/AppBar";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: "GearCart",
  description: "GearCart is an online store for all your gear needs.",
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {


  return (
    <html lang="en">
     
      <body>
        <AppProvider>
          <NextTopLoader height={5} showSpinner={false} />
          <AppBar />
         
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

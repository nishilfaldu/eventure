import { Nunito } from "next/font/google";

import ConvexClientProvider from "./_components/ConvexClientProvider";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import "@/app/globals.css";
import { Toaster as DefaultToaster } from "@/components/ui/toaster";



const league_spartan = League_Spartan({
  subsets: ["latin"],
});

export const metadata = {
  title: "Eventure Web Application",
  description: "Welcome to Eventure Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <ConvexClientProvider>
          <Navbar/>
          <main className="m-20">
            {children}
          </main>
          <Footer/>
          <DefaultToaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}

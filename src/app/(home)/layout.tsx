

import ConvexClientProvider from "@/app/_components/ConvexClientProvider";
import { Footer } from "@/app/_components/Footer";
import { Navbar } from "@/app/_components/Navbar";
import "@/app/globals.css";
import { Toaster as DefaultToaster } from "@/components/ui/toaster";



export const metadata = {
  title: "Eventure Web Application",
  description: "Welcome to Eventure Web Application",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <ConvexClientProvider>
      <Navbar/>
      <main className="m-20">
        {children}
      </main>
      <Footer/>
      <DefaultToaster />
    </ConvexClientProvider>
  );
}

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Nunito } from "next/font/google";

import ConvexClientProvider from "./_components/ConvexClientProvider";
import { Footer } from "./_components/Footer";
import Landing from "./_components/Landing";
import { Navbar } from "./_components/Navbar";
import "@/app/globals.css";
import { Toaster as DefaultToaster } from "@/components/ui/toaster";






const nunito = Nunito({
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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${nunito.className}`}>
        <ConvexClientProvider>
          <SignedIn>
            <Navbar/>
            <main className="m-20">
              {children}
            </main>
            <Footer/>
            <DefaultToaster />
          </SignedIn>
          <SignedOut>
            <Landing/>
          </SignedOut>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

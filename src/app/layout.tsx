import { Nunito } from "next/font/google";

import ConvexClientProvider from "./_components/ConvexClientProvider";
import { Navbar } from "./_components/Navbar";
import "@/styles/index.scss";



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
    <html lang="en">
      <body className={`${nunito.className}`}>
        <ConvexClientProvider>
          <Navbar/>
          <main>
            {children}
          </main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

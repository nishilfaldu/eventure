import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunito.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

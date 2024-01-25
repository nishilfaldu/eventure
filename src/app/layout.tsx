import { ClerkProvider } from "@clerk/nextjs";
import { League_Spartan } from "next/font/google";

import "@/styles/index.scss";




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
    <ClerkProvider>
      <html lang="en">
        <body className={`${league_spartan.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

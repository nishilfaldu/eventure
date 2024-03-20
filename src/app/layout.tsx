// import { Nunito } from "next/font/google";
import { League_Spartan } from "next/font/google";


import "@/app/globals.css";




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
      <body className={`${league_spartan.className}`}>
        <main className="m-0">
          {children}
        </main>
      </body>
    </html>
  );
}

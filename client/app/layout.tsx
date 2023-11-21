import { League_Spartan } from "next/font/google";


import "@/styles/index.scss";



const leagueSpartan = League_Spartan({
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
      <body className={`${leagueSpartan.className}`}>
        {children}
      </body>
    </html>
  );
}

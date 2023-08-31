import { Nunito } from "next/font/google";


import "@/styles/index.scss";



const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "7west Marketplace Web Application",
  description: "Welcome to 7west Marketplace Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        {children}
      </body>
    </html>
  );
}

// Error components have to be client components
"use client";

import type { NextPage } from "next";
import Link from "next/link";



const ErrorPage: NextPage = () => (
  <div className="flex flex-col items-center mt-16">
    <h2 className="text-xl">404 | Page Not Found</h2>
    <Link href="/">Go Back Home</Link>
  </div>
);

export default ErrorPage;

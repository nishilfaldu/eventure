"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

import { CategoryNavigationMenu } from "./CategoryMenu";
import { LogoSquare } from "./Logo";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";



export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full top-0 bg-white text-gray-600 body-font shadow-sm border-b border-gray-200 z-50">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-black no-underline flex font-medium items-center mb-4 md:mb-0">
            <LogoSquare/>
          </Link>
          <CategoryNavigationMenu/>
        </div>
        <nav className={`md:ml-auto flex-wrap items-center text-base justify-center min-[1200px]:block ${isSmallScreen && !isMenuOpen ? "hidden md:block" : "hidden"}`}>
          <Link href={"/"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Find an Expert</Link>
          <Link href={"/events"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">My Events</Link>
          <Link href={"/chats"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Chats</Link>
        </nav>
        <div className="flex items-center">
          <div className="md:hidden">
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link href={"/"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Find an Expert</Link>
                  <Link href={"/events"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Events</Link>
                  <Link href={"/chats"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Chats</Link>
                </div>
              )}
            </div>
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size={"lg"} className="text-base">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

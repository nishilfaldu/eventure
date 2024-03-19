"use client";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CategoryNavigationMenu } from "./CategoryMenu";
import { LogoSquare } from "./Logo";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const formattedSearchTerm = encodeURIComponent(searchTerm.trim());
      router.push(`/search?name=${formattedSearchTerm}`);
    }
  };

  return(
    <header className="fixed w-full top-0 bg-white text-gray-600 body-font shadow-sm border-b border-gray-200 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="text-black no-underline flex font-medium items-center mb-4 md:mb-0">
          <LogoSquare/>
        </Link>
        <CategoryNavigationMenu/>

        <div className="mx-auto">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8 w-80 text-center"
                onChange={handleChange}
                value={searchTerm}
              />
            </div>
          </form>
        </div>

        <nav className="md:ml-auto flex-wrap items-center text-base justify-center min-[1200px]:block hidden">
          <Link href={"/"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Home</Link>
          <Link href={"/events"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Events</Link>
          <Link href={"/chats"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Chats</Link>
          <Link href={"/schedule"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Schedule</Link>
        </nav>

        <SignedOut>
          <SignInButton mode="modal">
            <Button size={"lg"} className="text-base">Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </header>
  );
}

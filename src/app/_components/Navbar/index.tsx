import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Link from "next/link";

import { CategoryNavigationMenu } from "./CategoryMenu";
import { LogoSquare } from "./Logo";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export function Navbar() {
  return(
    <header className="text-gray-600 body-font shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="text-black no-underline flex font-medium items-center mb-4 md:mb-0">
          <LogoSquare/>
        </Link>
        <CategoryNavigationMenu/>

        <div className="ml-auto">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 w-80" />
            </div>
          </form>
        </div>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">Home</a>
          <a className="mr-5 hover:text-gray-900">Events</a>
          <a className="mr-5 hover:text-gray-900">Chats</a>
          <a className="mr-5 hover:text-gray-900">Schedule</a>
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

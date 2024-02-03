import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

import { LogoSquare } from "./Logo";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";



export function Navbar() {
  return(
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"> */}
        <Link href="/" className="text-black no-underline flex font-medium items-center mb-4 md:mb-0">
          <LogoSquare/>
        </Link>
        {/* </a> */}
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">Home</a>
          <a className="mr-5 hover:text-gray-900">Expert</a>
          <a className="mr-5 hover:text-gray-900">Chats</a>
          <a className="mr-5 hover:text-gray-900">Calls</a>
        </nav>

        <SignedOut>
          <SignInButton mode="modal">
            <Button size={"lg"} className="text-base">Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserMenu />
        </SignedIn>

        {/* </button> */}
      </div>
    </header>

  );
}

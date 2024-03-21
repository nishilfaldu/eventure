"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useCallback, useRef, useState, useEffect } from "react";

import MenuItem from "./MenuItem";
import MenuItemDivider from "./MenuItemDivider";
import { api } from "../../../../convex/_generated/api";
import { generateCustomerPortalLink } from "../Stripe/PricingTableAndBillingPortal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";



export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, []);
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn || !isLoaded) { return; }


  return(
    <div className="relative inline-block text-left z-20">
      <div>
        <Button
          aria-expanded="true"
          aria-haspopup="true"
          className="flex items-center rounded-full"
          id="options-menu"
          variant={"ghost"}
          size={"icon"}
        >
          <Avatar className="h-8 w-8" onClick={toggleOpen}>
            <AvatarImage alt="User Avatar" src={user.imageUrl}/>
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </Button>
      </div>
      {isOpen && <div ref={divRef} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div aria-labelledby="options-menu" aria-orientation="vertical" className="py-1" role="menu">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-800">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.primaryEmailAddress?.toString()}</p>
          </div>

          {/* MenuItems Group 1 */}
          <MenuItem label="Profile" href="/settings/" otherClassName="mt-2" />
          <MenuItem label="Transactions" href="/settings/transactions"/>
          <MenuItem label="Become a professional" href="/settings/become-a-professional" />

          <MenuItemDivider/>

          {/* MenuItems Group 2 */}
          <MenuItem label="Pricing" href="/settings/pricing" />

          <MenuItemDivider/>

          {/* MenuItems Group 3 */}
          <SignOutButton>
            <MenuItem label="Logout" href="#" />
          </SignOutButton>

          <MenuItemDivider/>

          <Link
            className="block mx-auto px-4 py-2 mt-2 mb-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md w-3/4 text-center"
            href="#"
            role="menuitem"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>}
    </div>
  );
}

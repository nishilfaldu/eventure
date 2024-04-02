"use client";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import Image from "next/image";

import { Composer } from "./Composer";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "@/components/ui/button";



export function SignInOrComposer({ children }: {children: React.ReactNode}) {
  const { isLoading, isAuthenticated } = useConvexAuth();

  // Render the Composer component only when the user is authenticated and not loading
  if (isLoading) {
    return <LoadingSpinner/>;
  } else if (isAuthenticated) {
    return <Composer>
      {children}
    </Composer>;
  } else {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-1">
        <div aria-hidden="true" className="relative mb-4 h-60 w-60">
          <Image
            src={"/images/hippo-empty-cart.png"}
            fill
            alt="empty shopping cart placeholder image"
          />
        </div>
        <div className="text-xl font-semibold">
            Your are signed out.
        </div>
        <Button variant={"link"}>
          <SignInButton mode="modal"/>
        </Button>
      </div>
    );
  }
}

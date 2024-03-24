"use client";

import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

import { Composer } from "./Composer";




export function SignInOrShowApp() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  console.log(isLoading, isAuthenticated);

  return isAuthenticated ? (
    <Composer />
  ) : (
    <div className="composer">
      <div>{isLoading ? <button disabled>...</button> : <SignInButton />}</div>
      <div className="h-1"></div>
    </div>
  );
}

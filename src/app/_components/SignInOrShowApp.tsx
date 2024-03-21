"use client";
import { useAuth } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

import { Composer } from "./Composer";



export function SignInOrComposer({ children }: {children: React.ReactNode}) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  //   const { userId } = useAuth();
  //   console.log(isLoading, isAuthenticated, "convex user auth");
  //   console.log(userId, "clerk user auth");

  // Render the Composer component only when the user is authenticated and not loading
  if (isLoading) {
    return <button disabled>Loading...</button>;
  } else if (isAuthenticated) {
    return <Composer>
      {children}
    </Composer>;
  } else {
    return (
      <div className="composer">
        Please sign in to continue.
        {/* Add SignInButton component if needed */}
      </div>
    );
  }
}

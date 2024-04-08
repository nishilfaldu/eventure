"use client";
import { useUser } from "@clerk/nextjs";
import { AuthLoading, Authenticated } from "convex/react";

import { ProfessionalForm } from "@/app/_components/Account/ProfessionalForm";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";



export default function BecomeAVendorPage() {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Become a Professional</h3>
        <p className="text-sm text-muted-foreground">
          Update your professional settings
        </p>
      </div>
      <Separator />
      <AuthLoading>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </AuthLoading>
      <Authenticated>
        {isLoaded ? <ProfessionalForm username={user!.username!}/> : "Loading..."}
      </Authenticated>
    </div>
  );
}

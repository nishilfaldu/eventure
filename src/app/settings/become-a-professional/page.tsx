"use client";
import { useUser } from "@clerk/nextjs";

import { ProfessionalForm } from "@/app/_components/Account/ProfessionalForm";
import { Separator } from "@/components/ui/separator";



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
      {isLoaded ? <ProfessionalForm username={user!.username!}/> : "Loading..."}
    </div>
  );
}

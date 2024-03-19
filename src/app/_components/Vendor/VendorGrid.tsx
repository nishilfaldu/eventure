"use client";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";

import { VendorListing } from "./VendorListing";
import type { api } from "../../../../convex/_generated/api";



interface VendorGridProps {
  preloadedProfessionals: Preloaded<typeof api.users.getProfessionals>;
}

export function VendorGrid({ preloadedProfessionals } : VendorGridProps) {
  const professionals = usePreloadedQuery(preloadedProfessionals);

  console.log(professionals, "professionals");

  return(
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {professionals.map((professional, i) => (
        <VendorListing
          //   currentUser={currentUser}
          key={`professional-${professional._id}`}
          professional={professional}
          index={i}
        />
      ))}
    </div>
  );
}

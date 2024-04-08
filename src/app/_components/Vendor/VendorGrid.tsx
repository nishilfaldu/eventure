"use client";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import Image from "next/image";

import { VendorListing } from "./VendorListing";
import type { api } from "../../../../convex/_generated/api";



interface VendorGridProps {
  preloadedProfessionals: Preloaded<typeof api.users.getProfessionals>;
}

export function VendorGrid({ preloadedProfessionals } : VendorGridProps) {
  const professionals = usePreloadedQuery(preloadedProfessionals);

  return(
    <>
      {professionals && professionals.length > 0 ?
        (
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
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div aria-hidden="true" className="relative mb-4 h-60 w-60">
              <Image
                src={"/images/hippo-empty-cart.png"}
                alt="empty shopping cart placeholder image"
                fill
              />
            </div>
            <div className="text-xl font-semibold">
                No professionals have signed up yet! Please check back later.
            </div>
          </div>
        )}
    </>

  );
}

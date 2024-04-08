"use client";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { VendorListing } from "../_components/Vendor/VendorListing";
import type { Id } from "convex/_generated/dataModel";



export default function SearchPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const inputSearch = searchParams.get("name")!;

  const searchedProfessionals = useQuery(api.users.getProfessionalsByCategoryId,
    { categoryParam: categoryId as Id<"categories"> ?? null, nameParam: inputSearch ?? "" });

  return (
    <div>
      <div>
        <div className="flex items-center justify-center text-5xl font-bold my-16">
          <h1 className="text-center">Find an Expert</h1>
        </div>
        <div>
          {searchedProfessionals && searchedProfessionals.length > 0 ?
            (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {
                  searchedProfessionals?.map((professional, i) => (
                    <VendorListing
                    //   currentUser={currentUser}
                      key={`professional-${professional?._id}`}
                      professional={professional!} /* TODO FIXME */
                      index={i}
                    />
                  ))
                }
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div aria-hidden="true" className="relative mb-4 h-60 w-60">
                  <Image
                    src={"/images/hippo-empty-cart.png"}
                    fill
                    alt="empty shopping cart placeholder image"
                  />
                </div>
                <div className="text-xl font-semibold">
                No professionals found. Please try again with a different search category.
                </div>
              </div>
            )}
        </div>
      </div>
    </div>

  );
}

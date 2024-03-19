"use client";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";

import { api } from "../../../convex/_generated/api";
import { VendorListing } from "../_components/Vendor/VendorListing";
import type { Id } from "convex/_generated/dataModel";



export default function SearchPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const inputSearch = searchParams.get("name")!;
  console.log(inputSearch);

  const searchedProfessionals = useQuery(api.users.getProfessionalsByCategoryId, { categoryParam: categoryId as Id<"categories"> ?? null, nameParam: inputSearch ?? "" });

  return (
    <div>
      <div>
        <div className="flex items-center justify-center text-6xl font-bold my-16">
          <h1 className="text-center">Browse Event Professionals</h1>
        </div>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {searchedProfessionals && searchedProfessionals.length > 0 ?
              searchedProfessionals?.map((professional, i) => (
                <VendorListing
                //   currentUser={currentUser}
                  key={`professional-${professional?._id}`}
                  professional={professional!}
                  index={i}
                />
              ))
              : <div className="flex items-center justify-center text-3xl">No results found</div>
            }
          </div>
        </div>
      </div>
    </div>

  );
}
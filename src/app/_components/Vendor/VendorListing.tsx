import { MessagesSquare, ShieldCheck, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Id } from "convex/_generated/dataModel";



interface VendorListingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  professional: {
    _id: Id<"users">;
    _creationTime: number;
    gender?: "Male" | "Female" | "Other";
    country?: string;
    city?: string;
    bio?: string;
    portfolio?: string;
    linkedIn?: string;
    instagram?: string;
    twitter?: string;
    pictureUrl: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username: string;
    email: string;
    tokenIdentifier: string;
    expert: boolean;
  };
  index: number;
}

export function VendorListing({ professional }: VendorListingProps) {
  return(
    <div>
      {/* professional image */}
      <Link
        href={`/professional/${professional._id}`}
        className="cursor-pointer"
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            loading="eager"
            className="-z-10 h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 66vw, 100vw"
            src={professional.pictureUrl}
            alt="Product image"
          />
          <div className="absolute top-3 right-3 z-10">
            {professional.verified && <ShieldCheck className="text-blue-600"/>}
          </div>
        </div>
      </Link>

      {/* professional brief details */}
      <div className="my-2">
        <h3 className="text-gray-900 text-lg title-font font-bold mb-1">{professional.firstName}{" "}{professional.lastName}</h3>
        <div className="mb-4">
          <span className="flex items-center gap-x-3">
            <span className="flex items-center gap-x-1">
              <StarIcon fill="black"/>
              <span className="font-semibold">4.97</span>
            </span>
            <span className="flex items-center gap-x-1">
              <MessagesSquare className=""/>
              <span>1150 consultations</span>
            </span>
          </span>
        </div>
      </div>

    </div>
  );
}

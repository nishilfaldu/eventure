import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



interface VendorListingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  index: number;
}

export function VendorListing({ vendor }: VendorListingProps) {
  return(
    <div>
      <Link
        href={`/vendor/${vendor.id}`}
        className="cursor-pointer"
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            loading="eager"
            className="-z-10 h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 66vw, 100vw"
            src={vendor.pictureUrl}
            alt="Product image"
          />
          <div className="absolute top-3 right-3 z-10">
            <ShieldCheck className="text-blue-600"/>
          </div>
        </div>
      </Link>
    </div>
  );
}

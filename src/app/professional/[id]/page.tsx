import { MessagesSquare, ShieldCheck, StarIcon } from "lucide-react";
import Image from "next/image";

import { UrlDropdown } from "@/app/_components/Vendor/UrlDropdown";
import { Separator } from "@/components/ui/separator";



export default function ProfessionalPage() {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="my-16">
        <div className="lg:grid lg:grid-cols-2 place-items-center w-full flex flex-col items-center gap-y-8">
          <div className="aspect-square relative overflow-hidden rounded-xl md:w-[480px] w-[400px]">
            <Image
              loading="eager"
              className="-z-10 object-cover object-center"
              // sizes="(min-width: 1024px) 66vw, 100vw"
              height={480}
              width={480}
              src={"https://api.minnect.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaHRUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3dea5d6a4113127153e54ab2b29a635b9bc6ea83/imagename.png"}
              alt="Product image"
            />
            <div className="absolute top-3 right-3 z-10">
              <ShieldCheck className="text-blue-600"/>
            </div>
          </div>
          {/* description */}
          <div className="lg:w-full flex items-center flex-col">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
            <div className="mb-4">
              <span className="flex items-center gap-x-3">
                <span className="flex items-center gap-x-1">
                  <StarIcon/>
                  <span>4.97</span>
                </span>
                <span className="flex items-center gap-x-1">
                  <MessagesSquare/>
                  <span>1150 consultations</span>
                </span>

                <Separator orientation="vertical" className="mx-2 bg-black"/>

                <span className="flex items-center gap-x-2">
                  <UrlDropdown/>
                </span>
              </span>
            </div>
            <p className="leading-relaxed text-center">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
            <button className="flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-neutral-800 rounded mt-4">Talk to me</button>
          </div>
        </div>
      </div>
    </section>
  );
}

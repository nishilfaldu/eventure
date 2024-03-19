"use client";
import { useUser } from "@clerk/nextjs";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { useMutation } from "convex/react";
import { MessagesSquare, ShieldCheck, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { LoadingSpinner } from "../LoadingSpinner";
import { ReviewCard } from "@/app/_components/Vendor/ReviewCard";
import { ReviewModal } from "@/app/_components/Vendor/ReviewModal";
import { UrlDropdown } from "@/app/_components/Vendor/UrlDropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";



interface ProfessionalDetailsProps {
  preloadedProfessional: Preloaded<typeof api.users.getProfessionalById>;
  preloadedCategories: Preloaded<typeof api.category.getCategoriesForUserById>;
}

export function ProfessionalDetails({ preloadedProfessional, preloadedCategories }: ProfessionalDetailsProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const professional = usePreloadedQuery(preloadedProfessional);
  const categories = usePreloadedQuery(preloadedCategories);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);

  const conversationMutation = useMutation(api.conversations.getOrCreateConversation);

  //   TODO: add loading indicators here
  if(!professional) { return null; }

  async function getConversationId() {
    if(!professional) { return null; }
    const conversation = await conversationMutation({ otherUserId: professional._id });
    setConversationId(conversationId);

    router.push(`/chats?conversationId=${conversation}`);

    return conversation;
  }

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
              src={professional.pictureUrl}
              alt="Product image"
            />
            <div className="absolute top-3 right-3 z-10">
              {professional.verified && <ShieldCheck className="text-blue-600"/>}
            </div>
          </div>
          {/* description */}
          <div className="lg:w-full flex lg:items-start flex-col items-center">
            <span className="flex items-center gap-x-2">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{professional.firstName}{" "}{professional.lastName}</h1>
              <UrlDropdown
                instagramHref={professional.instagram}
                linkedInHref={professional.linkedIn}
                twitterHref={professional.twitter}
                websiteHref={professional.portfolio}
              />
            </span>
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
              </span>
            </div>
            <p className="leading-relaxed lg:text-left text-center">{professional.bio}</p>
            <div className="flex gap-x-2 my-6">
              <span className="font-medium">Categories</span>
              <span className="flex gap-x-1">
                {
                  categories.map(category => {
                    return <Badge key={category?._id}>{category?.name}</Badge>;
                  })
                }
              </span>
            </div>
            {/* <button className="flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-neutral-800 rounded mt-4">Talk to me</button> */}
            {isLoaded && isSignedIn ? <Button className="mt-4" disabled={user.firstName === professional.firstName}>
              <Link
                className="text-white rounded text-center text-base focus:outline-none"
                href={`/chats?conversationId=${conversationId}`}
                role="link"
                unselectable="on"
                onClick={getConversationId}
              >
            Talk to me
              </Link>
            </Button> : <LoadingSpinner />}

          </div>
        </div>
      </div>

      {/* ratings and review portion */}
      <Separator className="my-14"/>
      <h2 className="text-3xl font-medium text-left mb-8 md:px-20 flex items-center gap-x-2 px-5">
        <StarIcon fill="black" className="mb-1"/> 4.97 {"(188 reviews)"}
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 md:px-20 gap-x-8 gap-y-8 px-5">
        {/* Ratings and Reviews */}
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
      {/* ReviewModal for seeing more reviews */}
      <ReviewModal/>
    </section>
  );
}

"use client";
import { useQuery } from "convex/react";
import Image from "next/image";

import { EventListing } from "./EventListing";
import { api } from "../../../../convex/_generated/api";
import { usePersistedState } from "@/lib/usePersistedStorage";
import type { Id } from "convex/_generated/dataModel";



interface EventGridProps {
  timeline: "past" | "upcoming";
}

export function EventGrid({ timeline }: EventGridProps) {
  const [{ userId }] = usePersistedState("userDetails", undefined);
  const events = useQuery(api.events.getEventsByUserId, { userId: userId as Id<"users">, timeline });

  return(
    <>
      {events && events.length > 0 ?
        (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {events?.map((event_, i) => (
              <EventListing
                //   currentUser={currentUser}
                key={`event-${event_._id}`}
                event={event_}
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
              {timeline === "past" ? "You have no past events" : "You have no upcoming events"}
            </div>
          </div>
        )

      }
    </>
  );
}

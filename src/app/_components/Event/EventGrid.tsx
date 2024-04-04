"use client";
import { useQuery } from "convex/react";

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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {events?.map((event_, i) => (
        <EventListing
          //   currentUser={currentUser}
          key={`event-${event_._id}`}
          event={event_}
          index={i}
        />
      ))}
    </div>
  );
}

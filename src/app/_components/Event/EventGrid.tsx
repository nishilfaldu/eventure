"use client";
import { useQuery } from "convex/react";

import { EventListing } from "./EventListing";
import { api } from "../../../../convex/_generated/api";
import { useUserStore } from "../UserStoreProvider";



interface EventGridProps {
  timeline: "past" | "upcoming";
}

export function EventGrid({ timeline }: EventGridProps) {
  const { userId }  = useUserStore(
    state => state,
  );
  const events = useQuery(api.events.getEventsByUserId, { userId, timeline });

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

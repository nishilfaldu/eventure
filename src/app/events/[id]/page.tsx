import { preloadQuery } from "convex/nextjs";

import { api } from "../../../../convex/_generated/api";
import { EventDetails } from "@/app/_components/Event/EventDetails";
import type { Id } from "convex/_generated/dataModel";




export default async function EventPage({ params }: {params: {id: string} }) {
//   const preloadedEvent = await preloadQuery(api.users.getEventById, { id: params.id as Id<"events"> });

  return (
    <EventDetails
    //   preloadedEvent={preloadedEvent}
    />
  );
}

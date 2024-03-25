import { EventDetails } from "@/app/_components/Event/EventDetails";




export default async function EventPage({ params }: {params: {id: string} }) {
  // TODO: preload query for faster load time
//   const preloadedEvent = await preloadQuery(api.users.getEventById, { id: params.id as Id<"events"> });

  return (
    <EventDetails
      eventId={params.id}
    //   preloadedEvent={preloadedEvent}
    />
  );
}

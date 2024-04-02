import { EventHeader } from "../_components/Event/EventHeader";




export default async function EventsPage() {
//   const preloadedEvents = await preloadQuery(api.events.getEventsByUserId, {});

  return (
    <div>
      <div className="text-6xl mt-16 text-black font-medium break-words">
        <h1 className="text-black">My Events</h1>
      </div>
      <EventHeader />
    </div>
  );
}

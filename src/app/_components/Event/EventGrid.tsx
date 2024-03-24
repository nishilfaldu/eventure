// function EventCards({ events, index }: { events: EventData[]; index: number }) {
//   return (
//     <div className="grid grid-cols-4 gap-3">
//       {events.length === 0 && index === 1 ? (
//         <div className="col-span-4 flex justify-center items-center">
//           <Image src={no_event} alt="No events yet."/>
//         </div>
//       ) : (
//         events.map((event, idx) => (
//           <div key={idx}>
//             <Link href={`/myEvents/${idx + 1}`}>
//               <Card style={{ width: 300 }}
//                 cover={// eslint-disable-next-line @next/next/no-img-element
//                   <img
//                     alt="example"
//                     src="https://creativesilhouettes.ca/wp-content/uploads/2021/07/pink-magnolia-flower_pattern.jpg"
//                   />}>
//                 <Meta title={event.name} description={event.date} />
//               </Card>
//             </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

"use client";
import type { Preloaded } from "convex/react";
import { usePreloadedQuery, useQuery } from "convex/react";

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
  const events = useQuery(api.events.getEventsByUserId, { userId });
  console.log(events);

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

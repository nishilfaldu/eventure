import dayjs from "dayjs";
import { CalendarIcon, NotebookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Id } from "convex/_generated/dataModel";



type EventProps = {
  date: string;
  name: string;
  type: string;
  _id: Id<"events">;
  userId: Id<"users">;
}


interface EventListingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: EventProps;
  index: number;
}

export function EventListing({ event }: EventListingProps) {
  return(
    <div>
      {/* professional image */}
      <Link
        href={`/events/${event._id}`}
        className="cursor-pointer"
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            loading="eager"
            className="-z-10 h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 66vw, 100vw"
            src={"https://creativesilhouettes.ca/wp-content/uploads/2021/07/pink-magnolia-flower_pattern.jpg"}
            alt="Product image"
          />
        </div>
      </Link>

      {/* professional brief details */}
      <div className="my-2">
        <h3 className="text-gray-900 text-lg title-font font-bold mb-1">{event.name}</h3>
        <div className="mb-4">
          <span className="flex items-center gap-x-3">
            <span className="flex items-center gap-x-1">
              <NotebookIcon />
              <span className="font-semibold">{event.type}</span>
            </span>
            <span className="flex items-center gap-x-1">
              <CalendarIcon />
              <span>{dayjs(event.date).format("MM/DD/YYYY")}</span>
            </span>
          </span>
        </div>
      </div>

    </div>
  );
}

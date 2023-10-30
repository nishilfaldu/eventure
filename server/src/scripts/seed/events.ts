import type { Prisma } from "@prisma/client";




export const events: Prisma.EventCreateArgs[] = [
    {
        data: {
            id: "1",
            date: new Date("2015-03-25"),
            name: "Wedding",
            type: "Unknown",
            location: "California",
        },
    },
];

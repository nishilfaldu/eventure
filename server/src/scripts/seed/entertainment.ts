import type { Prisma } from "@prisma/client";




export const events: Prisma.EntertainmentCreateArgs[] = [
    {
        data: {
            id: "1",
            music: true,
            entertainers: true,
            activities: true,
            photobooth: true,
            prizes: true,
        },
    },
];

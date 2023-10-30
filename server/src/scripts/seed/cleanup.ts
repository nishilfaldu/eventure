import type { Prisma } from "@prisma/client";




export const events: Prisma.CleanupCreateArgs[] = [
    {
        data: {
            id: "1",
            trashBags: true,
            supplies: true,
            recycle: true,
            containers: true,
        },
    },
];

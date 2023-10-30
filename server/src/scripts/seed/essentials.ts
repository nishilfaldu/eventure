import type { Prisma } from "@prisma/client";




export const events: Prisma.EssentialCreateArgs[] = [
    {
        data: {
            id: "1",
            utensils: true,
            cupsAndStraws: true,
            accessories: true,
            candles: true,
            cakeToppers: true,
        },
    },
];

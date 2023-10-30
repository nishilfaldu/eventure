import type { Prisma } from "@prisma/client";




export const events: Prisma.DecorationCreateArgs[] = [
    {
        data: {
            id: "1",
            balloons: true,
            posters: true,
            tableDecorations: true,
            wallDecorations: true,
            lights: true,
            personalizedTouches: "Sample Personalized Touches",
        },
    },
];

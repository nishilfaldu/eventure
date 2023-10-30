import type { Prisma } from "@prisma/client";




export const events: Prisma.FoodCreateArgs[] = [
    {
        data: {
            id: "1",
            appetizers: true,
            mainCourse: true,
            beverages: true,
            dessert: true,
            cake: true,
        },
    },
];

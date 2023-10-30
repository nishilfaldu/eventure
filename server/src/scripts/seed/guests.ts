import type { Prisma } from "@prisma/client";




export const events: Prisma.GuestCreateArgs[] = [
    {
        data: {
            id: "1",
            email: "joeburrow@gmail.com",
            name: "Joe Burrow",
            phoneNumber: "5135560576",
        },
    },
];

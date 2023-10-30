import type { Prisma } from "@prisma/client";




export const users: Prisma.UserCreateArgs[] = [
    {
        data: {
            id: "1",
            email: "samhubbard@gmail.com",
            firstName: "Sam",
            lastName: "Hubbard",
            country: "United States",
            phoneNumber: "5135560576",
        },
    },
];

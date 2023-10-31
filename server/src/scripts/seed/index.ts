import { PrismaClient } from "@prisma/client";

import { cleanup } from "./cleanup";
import { decorations } from "./decorations";
import { entertainment } from "./entertainment";
import { essentials } from "./essentials";
import { events } from "./events";
import { favors } from "./favors";
import { food } from "./food";
import { guests } from "./guests";
import { users } from "./users";



export const prisma = new PrismaClient({
    datasources: {
        postgresql: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            url: process.env.POSTGRES_URL_WITH_LOCALHOST!,
        },
    },
});

async function seedData() {
    await prisma.user.deleteMany();
    await prisma.guest.deleteMany();
    await prisma.cleanup.deleteMany();
    await prisma.decoration.deleteMany();
    await prisma.entertainment.deleteMany();
    await prisma.essential.deleteMany();
    await prisma.food.deleteMany();
    await prisma.event.deleteMany();
    await prisma.favor.deleteMany();

    await prisma.user.createMany({ data: users });
    await prisma.event.createMany({ data: events });
    await prisma.guest.createMany({ data: guests });
    await prisma.cleanup.createMany({ data: cleanup });
    await prisma.decoration.createMany({ data: decorations });
    await prisma.entertainment.createMany({ data: entertainment });
    await prisma.essential.createMany({ data: essentials });
    await prisma.food.createMany({ data: food });
    await prisma.favor.createMany({ data: favors });
}

seedData();

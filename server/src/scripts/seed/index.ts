import { PrismaClient } from "@prisma/client";




export const prisma = new PrismaClient({
    datasources: {
        postgresql: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            url: process.env.POSTGRES_PRISMA_URL!,
        },
    },
});

async function seedData() {
    await prisma.user.createMany();
}

seedData();

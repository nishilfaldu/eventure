import type { IncomingHttpHeaders } from "http";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookRequiredHeaders } from "svix";
import { Webhook } from "svix";

// import { db } from "@/db";
// import { users } from "@/db/schema";

// import { prisma } from "@/lib/db";



const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY || "";
// console.log(webhookSecret);

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);

    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;

    console.log(id, attributes);

    // await db.insert(users).values(
    //   {
    //     externalId: id as string,
    //     role: "USER",
    //     firstName: attributes.first_name,
    //     lastName: attributes.last_name,
    //     email: attributes.email_addresses[0].email_address,
    //     phoneNumber: attributes.phone_numbers[0].phone_number,
    //   }
    // );
    // await prisma.user.upsert({
    //   where: { externalId: id as string },
    //   create: {
    //     externalId: id as string,
    //     attributes,
    //   },
    //   update: { attributes },
    // });

    return new NextResponse("", { status: 200 });
  }

  return new NextResponse("", { status: 200 });
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;

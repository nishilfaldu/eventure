"use client";

import { headers } from "next/headers";
import type * as React from "react";
import { Resend } from "resend";

import { RegisterGuestEmailHtml } from "@/app/_components/emails/RegisterGuestEmail";



const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const headersList = headers();
  const registerHref = headersList.get("registerHref");
  const contactEmail = headersList.get("contactEmail");
  const contactPhone = headersList.get("contactPhone");
  const eventDate = headersList.get("eventDate");
  const eventLocation = headersList.get("eventLocation");
  const eventName = headersList.get("eventName");
  const guestFirstName = headersList.get("guestFirstName");

  if (!registerHref || !contactEmail || !contactPhone || !eventDate
    || !eventLocation || !eventName || !guestFirstName) {
    Response.json({ error: "Sufficient data is required to generate the email" });

    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Eventure <event@eventure.com>",
      to: ["event@eventure.com"],
      subject: "Invitation",
      react: RegisterGuestEmailHtml({
        registerHref: registerHref,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        eventDate: new Date(eventDate),
        eventLocation: eventLocation,
        eventName: eventName,
        guestFirstName: guestFirstName,
      }) as unknown as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}

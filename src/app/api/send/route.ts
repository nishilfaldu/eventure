import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { generateEmail } from "@/lib/welcome";





export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);
  // eslint-disable-next-line max-len
  const data = await req.json();
  console.log(data, "data");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataWithEmail = data.map((guest: any) => ({
    html: generateEmail(guest.guestName, guest.eventName, guest.eventDate,
      guest.eventLocation, guest.contactEmail, guest.contactPhone, guest.registerHref),
    to: [guest.toEmail],
    from: guest.from,
    subject: guest.subject,
  }));

  try {
    const { data, error } = await resend.batch.send(dataWithEmail);
    console.log(data, "data", error, "error");

    return NextResponse.json({
      status: "Ok",
    }, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      status: "Error",
    }, {
      status: 500,
    });
  }
}

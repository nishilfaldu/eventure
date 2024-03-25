import { NextResponse } from "next/server";
import { Resend } from "resend";

import { RegisterGuestEmailHtml } from "@/app/_components/emails/RegisterGuestEmail";

// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import type * as React from "react";
// import { Resend } from "resend";

// import { RegisterGuestEmailHtml } from "@/app/_components/emails/RegisterGuestEmail";





// export async function POST(req: Request) {
//   const resend = new Resend("re_H93JR9pC_D9Q7BwZtJ78N9U5UyDtLtuHh");
//   console.log(resend, "Resend");
//   console.log(await req.json());
//   // eslint-disable-next-line max-len

//   //   if (!registerHref || !contactEmail || !contactPhone || !eventDate
//   //     || !eventLocation || !eventName || !guestName) {
//   //     console.log("bale bale");
//   //     Response.json({ error: "Sufficient data is required to generate the email" });

//   //     return;
//   //   }

//   return NextResponse.json({
//     status: "Ok",
//   }, {
//     status: 200,
//   });


//     return NextResponse.json({
//       status: "Ok",
//     }, {
//       status: 200,
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(`Failed to send email: ${error.message}`);
//     }

//     return NextResponse.json({
//       error: "Internal server error.",
//     }, {
//       status: 500,
//     });
//   }
// }





// export const runtime = "edge";
// export const dynamic = "force-dynamic";

const RESEND_API_KEY = "re_H93JR9pC_D9Q7BwZtJ78N9U5UyDtLtuHh";

export async function POST(req: NextRequest) {
  const resend = new Resend(RESEND_API_KEY);
  // eslint-disable-next-line max-len
  //   const { registerHref, contactEmail, contactPhone, eventDate, eventLocation, eventName, guestName, toEmail } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "faldund@mail.uc.edu",
      to: ["faldund@mail.uc.edu"],
      subject: "hello world",
      html: "<strong>it works!</strong>",
    //   react: RegisterGuestEmailHtml({
    //     registerHref: "registerHref",
    //     contactEmail: "contactEmail",
    //     contactPhone: "contactPhone",
    //     eventDate: new Date("eventDate"),
    //     eventLocation: "eventLocation",
    //     eventName: "eventName",
    //     guestName: "guestName",
    //   }) as unknown as React.ReactElement,
    });
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

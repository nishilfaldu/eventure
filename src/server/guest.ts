import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, router } from "./trpc";
import { events, guests } from "@/db/schema";



export const guestRouter = router({
  getManyGuestsByEventId: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const eventId = input.eventId;
      const userId = ctx.auth.userId;

      return ctx.db
        .select()
        .from(events)
        .where(
          and(
            eq(events.id, eventId),
            eq(events.userId, userId)
          )
        )
        .innerJoin(
          guests, eq(events.id, guests.eventId)
        );
    }),

  addGuestByEventId: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
        eventId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const eventId = input.eventId;

      return ctx.db
        .insert(guests)
        .values({
          email: input.email,
          eventId: eventId,
          name: input.name,
          phoneNumber: input.phoneNumber,
        });
    }),

  registerAttendee: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
        guestEmail: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .update(guests)
        .set({
          registered: true,
        })
        .where(eq(guests.eventId, input.eventId));
    }),

  unRegisterAttendee: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
        guestEmail: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .update(guests)
        .set({
          registered: false,
        })
        .where(eq(guests.eventId, input.eventId));
    }),

  deleteGuestByEventId: protectedProcedure
    .input(
      z.object({
        guestId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .delete(guests)
        .where(eq(guests.id, input.guestId));
    }),

  updateGuestByEventId: protectedProcedure
    .input(
      z.object({
        guestId: z.number(),
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .update(guests)
        .set({
          email: input.email,
          name: input.name,
          phoneNumber: input.phoneNumber,
        })
        .where(eq(guests.id, input.guestId));
    }),

  // TODO: send email to guest - route
  //   sendEmailToGuestByEventId: protectedProcedure
  //     .input(
  //       z.object({
  //         eventId: z.string(),

//       })
//     ),
//   TODO: send email to guests - route
});

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, router } from "./trpc";
import { cleanup, decoration, entertainment, essential, events, favor, food } from "@/db/schema";
import { EventTypesEnum } from "@/lib/enums";



export const eventRouter = router({
  getManyEvents: protectedProcedure
    .query(({ ctx }) => {
      const userId = ctx.auth.userId;

      return ctx.db
        .select()
        .from(events)
        .where(eq(events.userId, userId));
    }),

  getEventById: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const userId = ctx.auth.userId;

      return ctx.db
        .select()
        .from(events)
        .where(
          and(
            eq(events.userId, userId),
            eq(events.id, input.eventId)
          )
        );
    }),

  deleteEventById: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.auth.userId;

      return ctx.db
        .delete(events)
        .where(
          and(
            eq(events.userId, userId),
            eq(events.id, input.eventId)
          )
        );
    }),

  createEvent: protectedProcedure
    .input(
      z.object({
        // core event details
        name: z.string(),
        type: EventTypesEnum,
        location: z.string(),
        datetime: z.string().datetime(),
      })
    ).mutation(({ ctx, input }) => {
      const userId = ctx.auth.userId;

      return ctx.db
        .insert(events)
        .values({
          userId: userId,
          location: input.location,
          datetime: input.datetime,
          type: input.type,
          name: input.name,
        });
    }),

  populateEventById: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
        // decoration details
        balloons: z.boolean(),
        posters: z.boolean(),
        tableDecorations: z.boolean(),
        wallDecorations: z.boolean(),
        lights: z.boolean(),
        personalizedTouches: z.boolean(),
        // entertainment details
        music: z.boolean(),
        entertainers: z.boolean(),
        activities: z.boolean(),
        photobooth: z.boolean(),
        prizes: z.boolean(),
        // cleanup details
        trashBags: z.boolean(),
        supplies: z.boolean(),
        recycle: z.boolean(),
        containers: z.boolean(),
        // essential details
        utensils: z.boolean(),
        cupsAndStraws: z.boolean(),
        accessories: z.boolean(),
        candles: z.boolean(),
        cakeToppers: z.boolean(),
        // favor details
        goodyBags: z.boolean(),
        thankyouNote: z.boolean(),
        // food details
        appetizers: z.boolean(),
        mainCourse: z.boolean(),
        desserts: z.boolean(),
        drinks: z.boolean(),
      })
    ).mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async tx => {
        const newDecoration = await tx
          .insert(decoration)
          .values({
            balloons: input.balloons,
            posters: input.posters,
            tableDecorations: input.tableDecorations,
            wallDecorations: input.wallDecorations,
            lights: input.lights,
            personalizedTouches: input.personalizedTouches,
          });

        const newEntertainment = await tx
          .insert(entertainment)
          .values({
            music: input.music,
            entertainers: input.entertainers,
            activities: input.activities,
            photobooth: input.photobooth,
            prizes: input.prizes,
          });

        const newEssential = await tx
          .insert(essential)
          .values({
            utensils: input.utensils,
            cupsAndStraws: input.cupsAndStraws,
            accessories: input.accessories,
            candles: input.candles,
            cakeToppers: input.cakeToppers,
          });

        const newCleanup = await tx
          .insert(cleanup)
          .values({
            trashBags: input.trashBags,
            supplies: input.supplies,
            recycle: input.recycle,
            containers: input.containers,
          });

        const newFavor = await tx
          .insert(favor)
          .values({
            goodyBags: input.goodyBags,
            thankyouNote: input.thankyouNote,
          });

        const newFood = await tx
          .insert(food)
          .values({
            appetizers: input.appetizers,
            mainCourse: input.mainCourse,
            desserts: input.desserts,
            drinks: input.drinks,
          });

        await tx.update(events).set({
          cleanupId: Number(newCleanup.insertId),
          decorationId: Number(newDecoration.insertId),
          entertainmentId: Number(newEntertainment.insertId),
          essentialId: Number(newEssential.insertId),
          favorId: Number(newFavor.insertId),
          foodId: Number(newFood.insertId),
        }).where(eq(events.id, input.eventId));
      });
    }),
});

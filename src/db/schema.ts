import { relations } from "drizzle-orm";
import { boolean, int, mysqlEnum, mysqlTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

import { eventTypesTuple, rolesTuple, statesTuple } from "@/lib/enums";


// SERIAL is an alias for BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE.
// TODO: I am not sure if real should be used instead of decimal, double, or float
// TODO: Check if you actually need createdAt and updatedAt for tables

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  type: mysqlEnum("role", eventTypesTuple),
  location: text("description").notNull(),
  date: timestamp("date", { mode: "string" }).defaultNow().notNull(),
  userId: int("userId").notNull(),
  decorationId: int("decorationId").notNull(),
  entertainmentId: int("entertainmentId").notNull(),
  foodId: int("foodId").notNull(),
  essentialId: int("essentialId").notNull(),
  favorId: int("favorId").notNull(),
  cleanupId: int("cleanupId").notNull(),
}, events => ({
  idIdx: uniqueIndex("idIdx").on(events.id),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.externalId],
  }),
  decoration: one(decoration, {
    fields: [events.decorationId],
    references: [decoration.id],
  }),
  entertainment: one(entertainment, {
    fields: [events.entertainmentId],
    references: [entertainment.id],
  }),
  food: one(food, {
    fields: [events.foodId],
    references: [food.id],
  }),
  essential: one(essential, {
    fields: [events.essentialId],
    references: [essential.id],
  }),
  favor: one(favor, {
    fields: [events.favorId],
    references: [favor.id],
  }),
  cleanup: one(cleanup, {
    fields: [events.cleanupId],
    references: [cleanup.id],
  }),
  guests: many(guests),
}));

export const users = mysqlTable("users", {
  // TODO: might have to change this later according to clerk as clerk stores most of the data
  externalId: varchar("externalId", { length: 256 }).primaryKey(),
  role: mysqlEnum("role", rolesTuple),
  email: varchar("email", { length: 256 }).notNull(),
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 256 }).notNull(),
  country: varchar("country", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }).notNull(),
  apartment: varchar("apartment", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  zipCode: varchar("zipCode", { length: 256 }).notNull(),
  state: mysqlEnum("state", statesTuple).notNull(),
}, users => ({
  idIdx: uniqueIndex("idIdx").on(users.externalId),
})
);

export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
}));

export const cleanup = mysqlTable("cleanup", {
  id: serial("id").primaryKey(),
  trashBags: boolean("trashBags"),
  supplies: boolean("supplies"),
  recycle: boolean("recycle"),
  containers: boolean("containers"),
  eventId: int("eventId").notNull(),
}, cleanup => ({
  idIdx: uniqueIndex("idIdx").on(cleanup.id),
}));

export const cleanupRelations = relations(cleanup, ({ one }) => ({
  event: one(events, {
    fields: [cleanup.eventId],
    references: [events.id],
  }),
}));

export const decoration = mysqlTable("decoration", {
  id: serial("id").primaryKey(),
  balloons: boolean("trashBags"),
  posters: boolean("posters"),
  tableDecorations: boolean("tableDecorations"),
  wallDecorations: boolean("wallDecorations"),
  lights: boolean("lights"),
  personalizedTouches: boolean("personalizedTouches"),
  eventId: int("eventId").notNull(),
}, decoration => ({
  idIdx: uniqueIndex("idIdx").on(decoration.id),
}));

export const decorationRelations = relations(decoration, ({ one }) => ({
  event: one(events, {
    fields: [decoration.eventId],
    references: [events.id],
  }),
}));

export const entertainment = mysqlTable("entertainment", {
  id: serial("id").primaryKey(),
  music: boolean("trashBags"),
  entertainers: boolean("entertainers"),
  activities: boolean("activities"),
  photobooth: boolean("photobooth"),
  prizes: boolean("prizes"),
  eventId: int("eventId").notNull(),
}, entertainment => ({
  idIdx: uniqueIndex("idIdx").on(entertainment.id),
}));

export const entertainmentRelations = relations(entertainment, ({ one }) => ({
  event: one(events, {
    fields: [entertainment.eventId],
    references: [events.id],
  }),
}));

export const essential = mysqlTable("essential", {
  id: serial("id").primaryKey(),
  utensils: boolean("utensils"),
  cupsAndStraws: boolean("cupsAndStraws"),
  accessories: boolean("accessories"),
  candles: boolean("candles"),
  cakeToppers: boolean("cakeToppers"),
  eventId: int("eventId").notNull(),
}, essential => ({
  idIdx: uniqueIndex("idIdx").on(essential.id),
}));

export const essentialRelations = relations(essential, ({ one }) => ({
  event: one(events, {
    fields: [essential.eventId],
    references: [events.id],
  }),
}));

export const favor = mysqlTable("favor", {
  id: serial("id").primaryKey(),
  goodyBags: boolean("bags"),
  thankyouNote: boolean("thankyouNote"),
  eventId: int("eventId").notNull(),
}, favor => ({
  idIdx: uniqueIndex("idIdx").on(favor.id),
}));

export const favorRelations = relations(favor, ({ one }) => ({
  event: one(events, {
    fields: [favor.eventId],
    references: [events.id],
  }),
}));

export const food = mysqlTable("food", {
  id: serial("id").primaryKey(),
  appetizers: boolean("appetizers"),
  mainCourse: boolean("mainCourse"),
  desserts: boolean("desserts"),
  drinks: boolean("drinks"),
  eventId: int("eventId").notNull(),
}, food => ({
  idIdx: uniqueIndex("idIdx").on(food.id),
}));

export const foodRelations = relations(food, ({ one }) => ({
  event: one(events, {
    fields: [food.eventId],
    references: [events.id],
  }),
}));

export const guests = mysqlTable("guests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 256 }).notNull(),
  eventId: int("eventId").notNull(),
}, guests => ({
  idIdx: uniqueIndex("idIdx").on(guests.id),
}));

export const guestsRelations = relations(guests, ({ one }) => ({
  event: one(events, {
    fields: [guests.eventId],
    references: [events.id],
  }),
}));

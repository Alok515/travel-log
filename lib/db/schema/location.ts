import type z from "zod";

import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./auth-schema";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  discription: text(),
  lat: real().notNull(),
  lng: real().notNull(),
  userId: text().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const locationInsertSchema = createInsertSchema(location, {
  name: field => field.trim().min(1).max(100),
  discription: field => field.trim().max(1000),
  lat: field => field.min(-90).max(90),
  lng: field => field.min(-180).max(180),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof locationInsertSchema>;

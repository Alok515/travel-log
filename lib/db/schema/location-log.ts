import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";
import { location } from "./location";

export const locationLog = sqliteTable("locationLog", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  lat: real().notNull(),
  lng: real().notNull(),
  userId: text().notNull().references(() => user.id),
  locationId: int().notNull().references(() => location.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

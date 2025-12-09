import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";
import { locationLog } from "./location-log";

export const locationLogImage = sqliteTable("locationLogImage", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  userId: text().notNull().references(() => user.id),
  locationLogId: int().notNull().references(() => locationLog.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

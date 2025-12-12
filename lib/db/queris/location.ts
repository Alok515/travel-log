import type { InsertLocation } from "~~/lib/db/schema/location";

import db from "~~/lib/db";
import { location } from "~~/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export async function findLocations(userId: string) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

export async function findLocationByName(existing: InsertLocation, userId: string) {
  return db.query.location.findFirst({
    where: and(eq(location.name, existing.name), eq(location.userId, userId)),
  });
}

export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function getUniqueSlug(slug: string): Promise<string> {
  let existingSlug = !!(await findLocationBySlug(slug));

  while (existingSlug) {
    const id = nanoid();
    const newSlug = `${slug}-${id}`;
    existingSlug = !!(await findLocationBySlug(newSlug));
    if (!existingSlug) {
      return newSlug;
    }
  }
  return slug;
}

export async function insertLocation(insertions: InsertLocation, slug: string, userId: string) {
  const [created] = await db.insert(location).values({
    ...insertions,
    slug,
    userId,
  }).returning();
  return created;
}

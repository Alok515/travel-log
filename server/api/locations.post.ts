import type { DrizzleError } from "drizzle-orm";

import db from "~~/lib/db";
import { location, locationInsertSchema } from "~~/lib/db/schema";
import { and, eq } from "drizzle-orm";
import slugGenrator from "slug";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const parsedBody = await readValidatedBody(event, locationInsertSchema.safeParse);

  if (!parsedBody.success) {
    const statusMessage = parsedBody.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}}`).join("; ");
    const data = parsedBody.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existingLocation = await db.query.location.findFirst({
    where: and(eq(location.name, parsedBody.data.name), eq(location.userId, event.context.user.id)),
  });

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location already exists!",
    }));
  }

  let slug = slugGenrator(parsedBody.data.name);
  const existing = await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
  if (existing) {
    const rand5CharId = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
    slug = `${slug}-${rand5CharId}`;
  }

  try {
    const [created] = await db.insert(location).values({
      ...parsedBody.data,
      slug,
      userId: event.context.user.id,
    }).returning();
    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message.includes("Failed query: insert")) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (location already exists)",
      }));
    }
  }
});

import type { DrizzleError } from "drizzle-orm";

import { findLocationByName, getUniqueSlug, insertLocation } from "~~/lib/db/queris/location";
import { locationInsertSchema } from "~~/lib/db/schema";
import defineAuthEventHandler from "~~/utils/define-auth-event-handler";
import slugGenrator from "slug";

export default defineAuthEventHandler(async (event) => {
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

  const existingLocation = await findLocationByName(parsedBody.data, event.context.user.id);

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location already exists!",
    }));
  }

  const slug = await getUniqueSlug(slugGenrator(parsedBody.data.name));

  try {
    return insertLocation(parsedBody.data, slug, event.context.user.id);
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

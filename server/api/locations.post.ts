import db from "~~/lib/db";
import { location, locationInsertSchema } from "~~/lib/db/schema";

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

  const [created] = await db.insert(location).values({
    ...parsedBody.data,
    slug: parsedBody.data.name.toLowerCase().replace(/ /g, "-"),
    userId: event.context.user.id,
  }).returning();

  return created;
});

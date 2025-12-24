import { findLocation } from "~~/lib/db/queris/location";
import defineAuthEventHandler from "~~/utils/define-auth-event-handler";

export default defineAuthEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;
  const location = await findLocation(slug, event.context.user.id);

  if (!location) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Location not found!",
    }));
  }

  return location;
});

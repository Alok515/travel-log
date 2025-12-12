import { findLocations } from "~~/lib/db/queris/location";
import defineAuthEventHandler from "~~/utils/define-auth-event-handler";

export default defineAuthEventHandler(async (event) => {
  return findLocations(event.context.user.id);
});

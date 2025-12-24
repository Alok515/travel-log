import type { SelectLocation } from "~~/lib/db/schema";
import type { MapPoint } from "~~/server/types";

export function isPointSelected(item: Pick<MapPoint, "id" | "lat" | "lng"> | null | undefined, selectedPoint: MapPoint | null | undefined): boolean {
  if (!item || !selectedPoint)
    return false;
  return item.id === selectedPoint.id && item.lat === selectedPoint.lat && item.lng === selectedPoint.lng;
}

export function createMapPointFromLocation(location: SelectLocation): MapPoint {
  return {
    ...location,
    to: { name: "dashboard-locations-slug", params: { slug: location.slug } },
    toLebal: "View",
  };
}

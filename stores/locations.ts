import type { MapPoint } from "~~/server/types";
import type { SideBarItem } from "~~/stores/sidebar";

import { useMapStore } from "~~/stores/map";
import { useSideBarStore } from "~~/stores/sidebar";
import { createMapPointFromLocation } from "~~/utils/map-points";
import { defineStore } from "pinia";

export const useLocations = defineStore("locations", () => {
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const sideBarStore = useSideBarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value && data.value.length) {
      const mapPoints: MapPoint[] = [];
      const sideBarItems: SideBarItem[] = [];
      data.value.forEach((location) => {
        const mapPoint = createMapPointFromLocation(location);
        mapPoints.push(mapPoint);
        sideBarItems.push({
          label: location.name,
          id: `location-${location.id}`,
          icon: "tabler:pin",
          to: { name: "dashboard-locations-slug", params: { slug: location.slug } },
          mapPoint,
        });
      });
      sideBarStore.sideBarItems = sideBarItems;
      mapStore.MapPoints = mapPoints;
    }
    sideBarStore.isLoading = status.value === "pending";
  });

  return {
    locations: data,
    status,
    refresh,
  };
});

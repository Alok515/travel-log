import type { SideBarItem } from "~~/stores/sidebar";

import { useMapStore } from "~~/stores/map";
import { useSideBarStore } from "~~/stores/sidebar";

export const useLocations = defineStore("locations", () => {
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const sideBarStore = useSideBarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (data.value && data.value.length) {
      sideBarStore.sideBarItems = data.value.map((item): SideBarItem => {
        return {
          label: item.name,
          id: `location-${item.id}`,
          icon: "tabler:pin",
          path: "#",
        };
      });
      mapStore.MapPoints = data.value.map((item) => {
        return {
          id: item.id,
          label: item.name,
          lat: item.lat,
          lng: item.lng,
        };
      });
    }
    sideBarStore.isLoading = status.value === "pending";
  });

  return {
    locations: data,
    status,
    refresh,
  };
});

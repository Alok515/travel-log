import type { SideBarItem } from "~~/stores/sidebar";

import { useSideBarStore } from "~~/stores/sidebar";

export const useLocations = defineStore("locations", () => {
  const { data, status, refresh } = useFetch("/api/locations", {
    lazy: true,
  });

  const sideBarStore = useSideBarStore();

  watchEffect(() => {
    if (data.value && data.value.length) {
      sideBarStore.sideBarItems = data.value.map((item): SideBarItem => {
        return {
          label: item.name,
          id: `location-${item.id}`,
          icon: "tabler:pin",
          path: "#",
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

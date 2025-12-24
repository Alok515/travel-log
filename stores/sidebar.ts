import type { MapPoint } from "~~/server/types";
import type { RouteLocationRaw } from "vue-router";

import { defineStore } from "pinia";

export type SideBarItem = {
  label: string;
  icon: string;
  id: string;
  path?: string;
  to?: RouteLocationRaw;
  mapPoint?: MapPoint | null;
};

export const useSideBarStore = defineStore("sideBarItems", () => {
  const sideBarItems = ref<SideBarItem[]>([]);
  const isLoading = ref(false);

  return { sideBarItems, isLoading };
});

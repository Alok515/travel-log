import type { MapPoint } from "~~/server/types";

import { defineStore } from "pinia";

export type SideBarItem = {
  label: string;
  icon: string;
  id: string;
  path: string;
  location?: MapPoint | null;
};

export const useSideBarStore = defineStore("sideBarItems", () => {
  const sideBarItems = ref<SideBarItem[]>([]);
  const isLoading = ref(false);

  return { sideBarItems, isLoading };
});

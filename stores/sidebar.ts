import { defineStore } from "pinia";

export type SideBarItem = {
  label: string;
  icon: string;
  id: string;
  path: string;
};

export const useSideBarStore = defineStore("sideBarItems", () => {
  const sideBarItems = ref<SideBarItem[]>([]);
  const isLoading = ref(false);

  return { sideBarItems, isLoading };
});

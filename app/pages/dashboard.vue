<script setup lang="ts">
import { useLocations } from "~~/stores/locations";
import { useMapStore } from "~~/stores/map";
import { useSideBarStore } from "~~/stores/sidebar";
import { isPointSelected } from "~~/utils/map-points";

const route = useRoute();

const isSideBarOpen = ref(true);
const locationsStore = useLocations();
const mapStore = useMapStore();

const sideBarStore = useSideBarStore();

function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}

onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSideBarOpen") === "true";
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
  }
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-600 shrink-0" :class="[isSideBarOpen ? 'w-64' : 'w-16']">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="[isSideBarOpen ? 'justify-end' : 'justify-center']"
        @click="toggleSideBar"
      >
        <icon :name="isSideBarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="26" />
      </div>
      <div class="flex flex-col gap-2">
        <SidebarButton
          label="Locations"
          icon="tabler:map"
          path="/dashboard"
          :show-label="isSideBarOpen"
        />
        <SidebarButton
          label="Add Location"
          icon="tabler:circle-plus-filled"
          path="/dashboard/add"
          :show-label="isSideBarOpen"
        />

        <div v-if="sideBarStore.isLoading || sideBarStore.sideBarItems.length" class="divider" />
        <div v-if="sideBarStore.isLoading" class="px-4">
          <div class="skeleton h-8 w-full" />
        </div>
        <div v-if="!sideBarStore.isLoading && sideBarStore.sideBarItems.length" class="flex flex-col gap-0.5">
          <SidebarButton
            v-for="sideItem in sideBarStore.sideBarItems"
            :key="sideItem.id"
            :label="sideItem.label"
            :icon="sideItem.icon"
            :to="sideItem.to"
            :show-label="isSideBarOpen"
            :icon-color="isPointSelected(mapStore.selectedPoint, sideItem.mapPoint) ? 'text-accent' : undefined"
            @mouseenter="mapStore.selectedPoint = sideItem.mapPoint ?? null"
            @mouseleave="mapStore.selectedPoint = null"
          />
        </div>
        <div class="divider" />
        <SidebarButton
          label="Sign Out"
          icon="tabler:logout-2"
          path="/dashboard/sign-out"
          :show-label="isSideBarOpen"
        />
      </div>
    </div>
    <div class="flex-1 overflow-auto bg-base-200">
      <div class="flex size-full" :class="{ 'flex-col': route.path !== '/dashboard/add' }">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>

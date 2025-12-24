<script setup lang="ts">
import { useLocations } from "~~/stores/locations";
import { useMapStore } from "~~/stores/map";
import { createMapPointFromLocation, isPointSelected } from "~~/utils/map-points";

const locationsStore = useLocations();
const mapStore = useMapStore();
const { locations, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="p-4 min-h-64">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-lg" />
    </div>
    <div v-else-if="locations && locations.length" class="flex flex-nowrap gap-2 mt-4 overflow-auto">
      <NuxtLink
        v-for="location in locations"
        :key="location.id"
        :to="{ name: 'dashboard-locations-slug', params: { slug: location.slug } }"
        class="card bg-base-300 shadow-xl w-72 h-40 border-2 shrink-0 mb-2 hover:cursor-pointer"
        :class="{
          'border-accent': isPointSelected(location, mapStore.selectedPoint),
          'border-transparent': !isPointSelected(location, mapStore.selectedPoint),
        }"
        @mouseenter="mapStore.selectedPoint = createMapPointFromLocation(location)"
        @mouseleave="mapStore.selectedPoint = null"
      >
        <div class="card-body">
          <div class="card-title">
            {{ location.name }}
          </div>
          <p class="card-xs">
            {{ location.discription }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <div v-else class="flex flex-col gap-2 mt-4">
      <p>Add a location to get started.</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary w-40">
        Add Location
        <Icon name="tabler:circle-plus" size="16" />
      </NuxtLink>
    </div>
  </div>
</template>

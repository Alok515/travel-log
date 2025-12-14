<script setup lang="ts">
import type { LngLatLike } from "maplibre-gl";

import { useMapStore } from "~~/stores/map";
import { isPointSelected } from "~~/utils/map-points";

const colorMode = useColorMode();
const mapStore = useMapStore();
const style = computed(() => {
  if (colorMode.value === "dark") {
    return "/styles/dark.json";
  }
  return "https://tiles.openfreemap.org/styles/liberty";
});
const center = [77.22445, 28.63576] as LngLatLike;
const zoom = 4;

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <div>
    <MglMap
      :map-style="style"
      :center="center"
      :zoom="zoom"
    >
      <MglNavigationControl />
      <MglMarker
        v-for="point in mapStore.MapPoints"
        :key="point.id"
        :coordinates="[point.lng, point.lat]"
      >
        <template #marker>
          <div
            class="tooltip tooltip-top hover:cursor-pointer"
            :class="{
              'tooltip-open': isPointSelected(point, mapStore.selectedPoint),
            }"
            :data-tip="point.name"
            @mouseenter="mapStore.selectedPoint = point"
            @mouseleave="mapStore.selectedPoint = null"
          >
            <Icon
              name="tabler:pin-filled"
              size="30"
              :class="isPointSelected(point, mapStore.selectedPoint) ? 'text-accent' : 'text-secondary'"
            />
          </div>
        </template>
        <MglPopup>
          <div>
            <h3 class="text-lg">
              {{ point.name }}
            </h3>
            <p v-if="point.discription" class="text-xs">
              {{ point.discription }}
            </p>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

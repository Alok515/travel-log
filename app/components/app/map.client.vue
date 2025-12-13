<script setup lang="ts">
import type { LngLatLike } from "maplibre-gl";

import { useMapStore } from "~~/stores/map";

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
          <div class="tooltip tooltip-top" :data-tip="point.label">
            <Icon
              name="tabler:pin-filled"
              size="30"
              class="text-secondary"
            />
          </div>
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>

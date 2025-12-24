<script setup lang="ts">
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";
import type { LngLat, LngLatLike } from "maplibre-gl";

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

function updateAddPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lng = location.lng;
    mapStore.addedPoint.lat = location.lat;
  }
}

function onDubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.addedPoint) {
    const { lng, lat } = mglEvent.event.lngLat;
    mapStore.addedPoint.lng = lng;
    mapStore.addedPoint.lat = lat;
  }
}

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
      @map:dblclick="onDubleClick"
    >
      <MglNavigationControl />
      <MglMarker
        v-if="mapStore.addedPoint"
        draggable
        :coordinates="[mapStore.addedPoint.lng, mapStore.addedPoint.lat]"
        @update:coordinates="updateAddPoint"
      >
        <template #marker>
          <div
            class="tooltip tooltip-top hover:cursor-pointer"
            data-tip="Drag this Marker"
          >
            <Icon
              name="tabler:pin-filled"
              size="30"
              class="text-yellow-500"
            />
          </div>
        </template>
      </MglMarker>
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
            <div class="flex justify-end mt-4">
              <NuxtLink
                v-if="point.to"
                :to="point.to"
                class="btn btn-sm btn-outline"
              >
                {{ point.toLebal }}
              </NuxtLink>
            </div>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

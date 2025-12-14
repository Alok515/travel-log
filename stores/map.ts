import type { MapPoint } from "~~/server/types";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map", () => {
  const MapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();

    effect(() => {
      const firstPoints = MapPoints.value[0];
      if (!firstPoints)
        return;

      const bounds = MapPoints.value.reduce((bounds, point) => {
        return bounds.extend([point.lng, point.lat]);
      }, new LngLatBounds([firstPoints.lng, firstPoints.lat], [firstPoints.lng, firstPoints.lat]));

      map.map?.fitBounds(bounds, {
        padding: 50,
      });
    });
  }

  return { MapPoints, init, selectedPoint };
});

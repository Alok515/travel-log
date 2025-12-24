<script setup lang="ts">
import { useMapStore } from "~~/stores/map";

const route = useRoute();
const mapStore = useMapStore();
const { slug } = route.params;
const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, {
  lazy: true,
});

effect(() => {
  if (location.value) {
    mapStore.MapPoints = [location.value];
  }
});
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'">
      <div class="loading" />
    </div>
    <div v-if="location && status === 'success'">
      <h2 class="text-2xl">
        {{ location.name }}
      </h2>
      <p class="text-sm">
        {{ location.discription }}
      </p>
      <div v-if="!location.locationLogs.length" class="mt-4">
        <p class="text-sm italic">
          Add a Location Log to get started.
        </p>
      </div>
      <button class="btn btn-primary mt-2">
        Add Location Log <Icon name="tabler:map-pin-plus" size="16" />
      </button>
    </div>
    <div v-if="error && status !== 'pending'" class="alert alert-error">
      <div class="text-error">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>

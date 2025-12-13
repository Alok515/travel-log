<script setup lang="ts">
import { useLocations } from "~~/stores/locations";

const locationsStore = useLocations();
const { locations, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-lg" />
    </div>
    <div v-else-if="locations && locations.length" class="flex flex-nowrap gap-2 mt-4 overflow-auto">
      <div
        v-for="location in locations"
        :key="location.id"
        class="card bg-base-400 shadow-xl w-72 h-40 shrink-0"
      >
        <div class="card-body">
          <div class="card-title">
            {{ location.name }}
          </div>
          <p class="card-xs">
            {{ location.discription }}
          </p>
        </div>
      </div>
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

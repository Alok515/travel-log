<script setup lang="ts">
import type { FetchError } from "ofetch";

import { locationInsertSchema } from "~~/lib/db/schema";
import { useMapStore } from "~~/stores/map";

const centerpoint = {
  lat: 28.63576,
  lng: 77.22445,
};

const { $csrfFetch } = useNuxtApp();
const mapStore = useMapStore();

const isLoading = ref(false);
const isSubmitted = ref(false);
const errorToast = ref("");

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(locationInsertSchema),
  initialValues: {
    lat: centerpoint.lat,
    lng: centerpoint.lng,
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    await $csrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });
    isSubmitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data.data);
    }
    errorToast.value = error.data?.statusMessage || error.statusMessage || "Something went wrong";
  }
  finally {
    isLoading.value = false;
  }
});

const router = useRouter();

function formatNumber(num?: number) {
  if (!num)
    return 0;
  return num.toFixed(5);
}

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("lng", mapStore.addedPoint.lng);
    setFieldValue("lat", mapStore.addedPoint.lat);
  }
});

onBeforeRouteLeave(() => {
  mapStore.addedPoint = null;

  if (isSubmitted.value || !meta.value.dirty)
    return true;

  // eslint-disable-next-line no-alert
  const confirmLeave = confirm("Are you sure you want to leave? Any unsaved changes will be lost.");
  if (!confirmLeave) {
    return false;
  }
  return true;
});

onMounted(() => {
  mapStore.addedPoint = {
    id: 1,
    name: "",
    discription: "",
    lat: centerpoint.lat,
    lng: centerpoint.lng,
  };
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4 p-4">
    <div class="mb-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have visited or want to visit. It can be a place you visited in the past, or a place you want to visit in the future.
      </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        legend="Location Name ?"
        name="name"
        type="text"
        :error="errors.name"
        :disabled="isLoading"
      />
      <AppFormField
        legend="Discription"
        name="discription"
        type="textarea"
        :error="errors.discription"
        :disabled="isLoading"
      />
      <p>
        Drag the <Icon
          name="tabler:pin-filled"
          size="16"
          class="text-yellow-500"
        /> marker on the map
      </p>
      <p>Or Double Click on the map.</p>
      <p class="text-sm text-gray-300">
        Current Location: {{ formatNumber(controlledValues.lat) }}, {{ formatNumber(controlledValues.lng) }}
      </p>

      <div class="flex justify-end gap-2">
        <button
          type="button"
          :disabled="isLoading"
          class="btn btn-outline"
          @click="router.back"
        >
          <Icon name="tabler:arrow-left" size="16" />
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading"
        >
          Add
          <span v-if="isLoading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus"
            size="16"
          />
        </button>
      </div>
    </form>
    <AppToast
      v-if="errorToast"
      :error-toast="errorToast"
      type="error"
      @remove="errorToast = ''"
    />
  </div>
</template>

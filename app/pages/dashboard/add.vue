<script setup lang="ts">
import type { FetchError } from "ofetch";

import { locationInsertSchema } from "~~/lib/db/schema";

const isLoading = ref(false);

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(locationInsertSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const inserted = await $fetch("/api/locations", {
      method: "POST",
      body: values,
    });
    console.log(inserted);
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data.data);
    }
  }
  finally {
    isLoading.value = false;
  }
});

const router = useRouter();

onBeforeRouteLeave(() => {
  if (!meta.value.dirty)
    return true;

  // eslint-disable-next-line no-alert
  const confirmLeave = confirm("Are you sure you want to leave? Any unsaved changes will be lost.");
  if (!confirmLeave) {
    return false;
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto mt-4">
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
        legend="What is your name?"
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
      <AppFormField
        legend="Latitude"
        name="lat"
        type="number"
        :error="errors.lat"
        :disabled="isLoading"
      />
      <AppFormField
        legend="Longitude"
        name="lng"
        type="number"
        :error="errors.lng"
        :disabled="isLoading"
      />

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
  </div>
</template>

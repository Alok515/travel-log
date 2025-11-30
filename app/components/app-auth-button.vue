<script setup lang="ts">
import { useAuth } from "~~/stores/auth";

const authStore = useAuth();
</script>

<template>
  <button
    :disabled="authStore.isLoading"
    class="btn btn-accent"
    @click="authStore.signIn"
  >
    Sign In
    <span v-if="authStore.isLoading" class="loading loading-spinner loading-sm" />
    <Icon
      v-else
      name="tabler:brand-google"
      size="18"
    />
  </button>
</template>

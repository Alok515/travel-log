<script setup lang="ts">
import { useAuth } from "~~/stores/auth";

const authStore = useAuth();
await authStore.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>

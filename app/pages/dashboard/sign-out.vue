<script setup lang="ts">
import { useAuth } from "~~/stores/auth";

const { signOut } = useAuth();

onMounted(() => {
  signOut();
});
</script>

<template>
  <div class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4">
    <span class="loading loading-spinner loading-sm" />
  </div>
</template>

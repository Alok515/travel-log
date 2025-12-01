<script setup lang="ts">
import { useAuth } from "~~/stores/auth";

const authStore = useAuth();
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-6">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Travel Log
        </h1>
        <p class="py-6">
          Every journey tells a story, and every memory deserves a place to live. Travel Log is your personal space to record, relive, and cherish the moments that shaped your adventures. Whether it was a sunrise in the mountains, a quiet street café in a new city, or the laughter shared miles away from home, your experiences should never fade.
        </p>
        <AppAuthButton v-if="!authStore.user" />
        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-primary"
        >
          Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

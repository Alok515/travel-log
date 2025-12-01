<script setup lang="ts">
import { useAuth } from "~~/stores/auth";

const authStore = useAuth();
</script>

<template>
  <div v-if="!authStore.isLoading && authStore.user">
    <details class="dropdown dropdown-end">
      <summary class="btn m-1">
        <div v-if="authStore.user?.image" class="avatar">
          <div class="w-8 rounded-full">
            <img
              :src="authStore.user.image"
              :alt="authStore.user.name"
            >
          </div>
        </div>
        {{ authStore.user.name }}
      </summary>
      <ul class="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <NuxtLink to="/dashboard/sign-out">
            <Icon name="tabler:logout-2" size="18" />
            Sign Out
          </NuxtLink>
        </li>
      </ul>
    </details>
  </div>
  <button
    v-else
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

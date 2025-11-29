<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (value) => {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input
      v-model="isDark"
      type="checkbox"
      class="theme-controller"
    >

    <!-- sun icon -->
    <Icon
      class="swap-on"
      name="tabler:sun-high-filled"
      size="24"
    />

    <!-- moon icon -->
    <Icon
      class="swap-off text-gray-800"
      name="tabler:moon-filled"
      size="24"
    />
  </label>
</template>

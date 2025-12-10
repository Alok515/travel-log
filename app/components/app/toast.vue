<script setup lang="ts">
const props = defineProps<{ errorToast?: string; type: "success" | "error" | "warning" | "info" }>();
const emit = defineEmits(["remove"]);

onMounted(() => {
  setTimeout(() => {
    emit("remove");
  }, 3000);
});
</script>

<template>
  <Teleport to="body">
    <div class="toast toast-top toast-end">
      <div class="alert" :class="`alert-${props.type}`">
        <span>{{ props.errorToast }}</span>
      </div>
    </div>
  </Teleport>
</template>

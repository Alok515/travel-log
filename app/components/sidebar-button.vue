<script setup lang="ts">
const props = defineProps({
  label: String,
  icon: String,
  path: String,
  showLabel: Boolean,
});

const route = useRoute();

// This state controls the justification class and is synced with the animation hooks.
const isTextVisible = ref(props.showLabel);

// Fired *after* the leave animation finishes.
const onAfterLeave = () => isTextVisible.value = false;
// Fired *before* the enter animation starts.
const onBeforeEnter = () => isTextVisible.value = true;
</script>

<template>
  <div
    class="tooltip-right"
    :data-tip="props.showLabel ? '' : props.label"
    :class="{ tooltip: !props.showLabel }"
  >
    <NuxtLink
      :to="props.path"
      :class="{ 'bg-base-300': route.path === props.path, 'justify-center': !isTextVisible, 'justify-start pl-2': isTextVisible }"
      class="flex items-center gap-2 hover:bg-base-300 hover:cursor-pointer transition-all duration-500"
    >
      <Icon
        v-if="props.icon"
        :name="props.icon"
        size="18"
      />
      <Transition
        name="hide"
        @after-leave="onAfterLeave"
        @before-enter="onBeforeEnter"
      >
        <span v-if="showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.hide-enter-active {
  animation: grow 0.4s;
}

.hide-leave-active {
  animation: grow 0.4s reverse;
}

.hide-enter-active,
.hide-leave-active {
  transition: opacity 0.4s ease-in-out;
  white-space: nowrap;
}

.hide-enter-from,
.hide-leave-to {
  opacity: 0;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

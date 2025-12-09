<script setup lang="ts">
const props = defineProps<{
  legend: string;
  name: string;
  type: "text" | "number" | "textarea";
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.legend }}
    </legend>
    <Field
      :as="props.type === 'textarea' ? 'textarea' : 'input'"
      :type="props.type"
      :name="props.name"
      :disabled="props.disabled"
      class="w-full"
      :class="{ 'input-error': props.error, 'textarea': props.type === 'textarea', 'input': props.type !== 'textarea' }"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>

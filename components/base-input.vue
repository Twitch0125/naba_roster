<script lang="ts" setup>
const props = defineProps<{ label?: string; icon?: string }>();
defineOptions({
  inheritAttrs: true,
});
const classes = computed(() => {
  const obj = {
    input: '',
    label: '',
  };
  if (props.icon) {
    obj.input = "ps-9";
  }

  return obj
});
</script>
<template>
  <label>
    <span v-if="label" class="text-sm uppercase font-medium text-gray-600">
      {{ $props.label }}
    </span>
    <div class="relative">
      <input
        v-bind="$attrs"
        class="px-2.5 py-1.5 block outline-none text-gray-9000 font-medium theme.surface w-full rounded theme.border border-1 focus:ring ring-blue-900"
        :class="classes.input"
      />
      <span
        v-if="$props.icon"
        class="absolute inset-y-0 start-0 ps-2.5 flex theme.text-primary items-center justify-center"
      >
        <span class="w-5 h-5" :class="$props.icon"> </span>
      </span>
    </div>
  </label>
</template>

<style></style>

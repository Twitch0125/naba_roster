<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  icon?: string;
  block?: boolean;
  valueAttribute: string;
  optionAttribute: string;
  options: {}[];
  modelValue: any
}>();
const model = useVModel(props);
const classes = computed(() => {
  const obj = {
    input:
      "px-2.5 py-1.5 h-38px block outline-none text-gray-900 shadow-sm font-medium theme.surface w-full rounded theme.border border-1 focus:ring ring-blue-900",
    label: "text-sm uppercase font-medium text-gray-600",
    container: "",
  };
  if (props.icon) {
    obj.input = `${obj.input} ps-9`;
  }
  if (props.block) {
    obj.container = "block";
  }
  return obj;
});
</script>
<template>
  <label :class="classes.container">
    <span v-if="label" :class="classes.label">
      {{ $props.label }}
    </span>
    <div class="relative">
      <select v-model="model" v-bind="$attrs" class="" :class="classes.input">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <option
          v-for="option of $props.options"
          :value="option[$props.valueAttribute]"
        >
          {{ option[$props.optionAttribute] }}
        </option>
      </select>
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

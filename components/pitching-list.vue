<script lang="ts" setup>
type PitchingStats = {
  stuff: number;
  movement: number;
  control: number;
};
const props = defineProps<{
  overall: PitchingStats;
  vsL: PitchingStats;
  vsR: PitchingStats;
  potential: PitchingStats;
}>();

const statGroups = computed(() => [
  props.overall,
  props.vsL,
  props.vsR,
  props.potential,
]);
</script>

<template>
  <!-- eslint-disable vue/require-v-for-key -->
  <div class="grid grid-cols-5 max-w-sm py-3 rounded text-medium-emphasis">
    <div class="text-sm font-bold uppercase">Rating</div>
    <div class="text-sm font-bold uppercase grid justify-items-end">Overall</div>
    <div class="text-sm font-bold uppercase grid justify-items-end">Vs L</div>
    <div class="text-sm font-bold uppercase grid justify-items-end">Vs R</div>
    <div class="text-sm font-bold uppercase grid justify-items-end">Pot.</div>
    <div class="text-high-emphasis">
      <div>stuff</div>
      <div>movement</div>
      <div>control</div>
    </div>
    <div v-for="(stats) of statGroups" class="grid justify-items-end">
      <div :class="findColor(stats.stuff)">
        {{ stats.stuff }}
      </div>
      <div :class="findColor(stats.movement)">
        {{ stats.movement }}
      </div>
      <div :class="findColor(stats.control)">
        {{ stats.control }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type BattingStats = {
  contact: number;
  gap: number;
  power: number;
  eye: number;
  ks: number;
};
const props = defineProps<{
  overall: BattingStats;
  vsL: BattingStats;
  vsR: BattingStats;
  potential: BattingStats;
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
      <div>contact</div>
      <div>gap</div>
      <div>power</div>
      <div>eye</div>
      <div>avoid k</div>
    </div>
    <div v-for="(stats) of statGroups" class="grid justify-items-end">
      <div :class="findColor(stats.contact)">
        {{ stats.contact }}
      </div>
      <div :class="findColor(stats.gap)">
        {{ stats.gap }}
      </div>
      <div :class="findColor(stats.power)">
        {{ stats.power }}
      </div>
      <div :class="findColor(stats.eye)">
        {{ stats.eye }}
      </div>
      <div :class="findColor(stats.ks)">
        {{ stats.ks }}
      </div>
    </div>
  </div>
</template>

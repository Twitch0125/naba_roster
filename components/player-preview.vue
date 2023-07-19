<script lang="ts" setup>
const props = defineProps<{ playerId: number | string }>();
const playerKey = `player_${props.playerId}`;
await useFetch(`/api/player/${props.playerId}`, {
  key: playerKey,
});

const { data } = useNuxtData(playerKey);
const player = toValue(data);
const ratings = {
  contact: scale(player.contact_pot),
  gap: scale(player.gap_pot),
  power: scale(player.power_pot),
  eye: scale(player.eye_pot),
  ks: scale(player.ks_pot),
  stuff: scale(player.stuff_pot),
  movement: scale(player.move_pot),
  control: scale(player.control_pot),
};
</script>
<template>
  <div>
    <h1 class="text-lg font-bold theme.text-primary mb-3">
      {{ player.first_name }} {{ player.last_name }}
      <small class="font-bold text-sm text-gray-600">
        {{ getPosition(player.position)?.abbreviation }}
      </small>
    </h1>
    <h2 class="font-bold text-base">Batting</h2>
    <div class="grid grid-cols-2 max-w-sm theme.surface py-3 rounded">
      <!-- headers -->
      <div class="text-sm font-bold uppercase text-gray-600">rating</div>
      <div class="text-sm font-bold uppercase text-gray-600">potential</div>

      <!-- body -->
      <div>contact</div>
      <div :class="findColor(ratings.contact)">
        {{ ratings.contact }}
      </div>
      <div>gap</div>
      <div :class="findColor(ratings.gap)">
        {{ ratings.gap }}
      </div>
      <div>eye</div>
      <div :class="findColor(ratings.eye)">
        {{ ratings.eye }}
      </div>
      <div>avoid k</div>
      <div :class="findColor(ratings.ks)">
        {{ ratings.ks }}
      </div>
    </div>
    <h2 class="font-bold text-base">Pitching</h2>
    <div class="grid grid-cols-2 max-w-sm theme.surface py-3 rounded">
      <!-- headers -->
      <div class="text-sm font-bold uppercase text-gray-600">rating</div>
      <div class="text-sm font-bold uppercase text-gray-600">potential</div>

      <!-- body -->
      <div>stuff</div>
      <div :class="findColor(ratings.stuff)">
        {{ ratings.stuff }}
      </div>
      <div>movement</div>
      <div :class="findColor(ratings.movement)">
        {{ ratings.movement }}
      </div>
      <div>control</div>
      <div :class="findColor(ratings.control)">
        {{ ratings.control }}
      </div>
    </div>
  </div>
</template>

<style></style>

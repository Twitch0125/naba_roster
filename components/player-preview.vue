<script lang="ts" setup>
import { PlayerFull } from "~/server/utils/db";
const props = defineProps<{ playerId: number | string }>();
const playerKey = `player_${props.playerId}`;
//a page should be sure to set this player key
const { data: player } = useNuxtData<PlayerFull>(playerKey);

const potentialRatings = computed(() => ({
  contact: scale(player.value.contact_pot),
  gap: scale(player.value.gap_pot),
  power: scale(player.value.power_pot),
  eye: scale(player.value.eye_pot),
  ks: scale(player.value.ks_pot),
  stuff: scale(player.value.stuff_pot),
  movement: scale(player.value.move_pot),
  control: scale(player.value.control_pot),
}));

function getAvg(a: number, b: number) {
  return (a + b) / 2;
}
const overallRatings = computed(() => ({
  contact: scale(getAvg(player.value.contact_vl, player.value.contract_vr)),
  gap: scale(getAvg(player.value.gap_vl, player.value.gap_vr)),
  power: scale(getAvg(player.value.power_vl, player.value.power_vr)),
  eye: scale(getAvg(player.value.eye_vl, player.value.eye_vr)),
  ks: scale(getAvg(player.value.avoid_kvl, player.value.ks_vr)),
  stuff: scale(player.value?.stuff_overall),
  movement: scale(getAvg(player.value.ove_vl, player.value.movement_vr)),
  control: scale(getAvg(player.value.control_vl, player.value.control_vr)),
}));

const vsRRatings = computed(() => ({
  contact: scale(player.value.contract_vr),
  gap: scale(player.value.gap_vr),
  power: scale(player.value.power_vr),
  eye: scale(player.value.eye_vr),
  ks: scale(player.value.ks_vr),
  stuff: scale(player.value?.stuff_overall * player.value?.["stuff_r/l_split"]), //split here is like 1.0 or 0.9123 or 1.123. IDK which is actually R or L
  movement: scale(player.value.movement_vr),
  control: scale(player.value.control_vr),
}));

const vsLRatings = computed(() => ({
  contact: scale(player.value.contact_vl),
  gap: scale(player.value.gap_vl),
  power: scale(player.value.power_vl),
  eye: scale(player.value.eye_vl),
  ks: scale(player.value.avoid_kvl),
  stuff: scale(player.value?.stuff_overall * player.value?.["stuff_r/l_split"]), //split here is like 1.0 or 0.9123 or 1.123. IDK which is actually R or L
  movement: scale(player.value.ove_vl),
  control: scale(player.value.control_vl),
}));
</script>
<template>
  <div v-if="player">
    <h1 class="text-lg font-bold theme.text-primary mb-3">
      {{ player.first_name }} {{ player.last_name }}
      <small class="font-bold text-sm text-gray-600">
        {{ getPosition(player.position)?.abbreviation }}
      </small>
    </h1>
    <h2 class="font-bold text-base">Batting</h2>
    <BattingList
      :potential="potentialRatings"
      :overall="overallRatings"
      :vs-l="vsLRatings"
      :vs-r="vsRRatings"
    />
    <h2 class="font-bold text-base">Pitching</h2>
    <PitchingList
      :potential="potentialRatings"
      :overall="overallRatings"
      :vs-l="vsLRatings"
      :vs-r="vsRRatings"
    />
  </div>
</template>

<style></style>

<script lang="ts" setup>
const id = useRoute().params.id;
const playerKey = `player_${id}`;
const { data: player } = useNuxtData(playerKey);
!player.value &&
  (await useFetch(`/api/player/${id}`, {
    key: playerKey,
  }));
defineOgImage({
  title: `${player?.first_name} ${player?.last_name}`,
});
</script>
<template>
  <div class="m-12">
    <NuxtLink
      to="/"
      class="text-primary text-lg inline-flex items-center gap-2"
    >
      <span class="i-tabler-arrow-left w-5 h-5"></span> Home</NuxtLink
    >
    <PlayerPreview :player-id="id" />
  </div>
</template>

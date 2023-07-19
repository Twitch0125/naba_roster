<script lang="ts" setup>
const id = useRoute().params.id;
const playerKey = `player_${id}`;
const { data: player } = useNuxtData(playerKey);
!player.value &&
await useFetch(`/api/player/${id}`, {
  key: playerKey,
});
defineOgImage({
  title: `${player?.first_name} ${player?.last_name}`,
});
</script>
<template>
  <PlayerPreview class="mx-12 mt-12" :player-id="id" />
</template>

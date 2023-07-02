<script lang="ts" setup>
const search = ref("");

const { refresh } = await useFetch("/api/players", {
  key: "players",
  query: {
    search: search,
  },
});

const { data: players } = useNuxtData("players");

const updateSearch = useDebounceFn((event: Event) => {
  search.value = event.target!.value;
}, 500);
</script>
<template>
  <Html class="font-sans theme.text-primary theme.background"></Html>
  <div>
    <form
      id="form"
      class="font-sans max-w-lg mx-auto mt-12 theme.surface p-6 theme.border"
      action="/api/csv"
      method="POST"
      enctype="multipart/form-data"
    >
      <label class="text-lg font-medium">
        File
        <input id="file" type="file" name="file" />
      </label>
      <button class="theme.button">Submit</button>
    </form>
    <div class="mx-12">
      <label>
        Search for players
        <input
          id="search"
          :value="search"
          name="search"
          type="search"
          @input="updateSearch"
        />
      </label>
      <button type="button" @click="() => refresh()">refresh</button>
      <div
        v-for="player of players"
        :key="player.id"
        class="theme.surface p-4 theme.border"
      >
        <div>{{ player.first_name }} {{ player.last_name }}</div>
        <div class="text-sm text-gray-600">
          {{ player.team_name }}
        </div>
      </div>
    </div>
  </div>
</template>

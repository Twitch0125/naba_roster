<script lang="ts" setup>
const search = ref("");

const { refresh } = await useFetch("/api/players", {
  key: "players",
  query: {
    search: search, //when search is updated this request will re-run
  },
});

const { data: players } = useNuxtData("players");

const updateSearch = useDebounceFn((event: Event) => {
  search.value = event.target!.value;
}, 500);
</script>
<template>
  <div class="mt-12">
    <div class="mx-12">
      <BaseInput
        id="search"
        label="Search for players"
        type="search"
        name="search"
        placeholder="Search"
        class="mb-2"
        icon="i-tabler-search"
        :value="search"
        @input="updateSearch"
      />
      <div
        v-for="player of players"
        :key="player.id"
        class="theme.surface theme.border p-4 border-1 border-b-0 [&:last-child]:border-b-1"
      >
        <div class="font-medium">
          {{ player.first_name }}
          {{ player.last_name }}
          <span class="font-bold text-sm text-gray-500">
            {{ getPosition(player.position)?.abbreviation || player.position }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          {{ player.team_name }}
        </div>
      </div>
    </div>
  </div>
</template>

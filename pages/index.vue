<script lang="ts" setup>
const search = ref("");
const { data: total } = useNuxtData("players-total");
await useFetch("/api/players", {
  key: "players",
  query: {
    search: search, //when search is updated this request will re-run
  },
  onResponse(ctx) {
    total.value = Number(ctx.response.headers.get("x-total-count"));
  },
});
await useFetch("/api/teams", {
  key: "teams",
  query: {
    search: search, //when search is updated this request will re-run
  },
});
const { data: players } = useNuxtData("players");
const { data: teams } = useNuxtData("teams");

const updateSearch = useDebounceFn((event: Event) => {
  search.value = event.target!.value;
}, 500);
</script>
<template>
  <div class="mt-12 mx-12">
    <div class="grid gap-3 grid-cols-5">
      <div class="col-span-4">
        <BaseInput
          id="search"
          block
          label="Search for players"
          type="search"
          name="search"
          placeholder="Search"
          icon="i-tabler-search"
          :value="search"
          @input="updateSearch"
        />
      </div>
      <div>
        <select>
          <option v-for="team of teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>
      <div class="col-span-5 h-0 theme.border border-t-1"></div>
      <NuxtLink
        v-for="player of players"
        :key="player.id"
        :to="`/players/${player.id}`"
        class="theme.surface theme.border px-2.5 py-1.5 border-1 rounded focus:ring ring-blue-900"
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
      </NuxtLink>
    </div>
    <div class="text-gray-600 mt-6">
      {{ total }} total players
    </div>
  </div>
</template>

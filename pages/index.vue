<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
const searchQuery = useRouteQuery("search", "");
const search = refDebounced(searchQuery, 300);
const team = useRouteQuery<string>("team", "any");
function resetFilters() {
  searchQuery.value = "";
}

const { data: total } = useLazyFetch("/api/players-total", { server: false });
await Promise.all([
  useFetch("/api/players", {
    key: "players",
    query: {
      search, //when search is updated this request will re-run
      team, //when team is updated this request will re-run
    },
  }),
  useFetch("/api/teams", {
    key: "teams",
    transform(data) {
      return data.map((team) => ({
        title: team.name,
        value: team.name,
        id: `team-option-${team.id}`,
        apiValue: team.id,
      }));
    },
  }),
]);

const { data: players } = useNuxtData("players");
const { data: teams } = useNuxtData("teams");

const anyValue = {
  value: "Any",
  title: "Any",
  id: "team-option-any",
  apiValue: "any",
};
const selectedTeam = ref(anyValue.value);
const teamApiValueMap = teams.value?.reduce((acc, team) => {
  acc[team.value] = team.apiValue;
  return acc;
}, {});
watch(selectedTeam, (selected) => {
  team.value = teamApiValueMap[selected] || "any";
});
const teamOptions = [anyValue, ...teams.value];
function preloadPlayer(id) {
  const playerKey = `player_${id}`;
  const { data: player } = useNuxtData(playerKey);

  if (!player.value)
    useFetch(`/api/player/${id}`, {
      key: playerKey,
    });
}
</script>
<template>
  <div class="mt-12 mx-12">
    <div class="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-5 items-end">
      <h1 class="text-xl lg:text-3xl font-display">
        North American Baseball Association
      </h1>
      <div class="md:(col-span-2)">
        <AInput id="search" v-model="searchQuery" label="Search for players" prepend-inner-icon="i-tabler-search" />
      </div>
      <div class="md:col-start-4">
        <ASelect id="team" v-model="selectedTeam" label="Team" :options="teamOptions">
        </ASelect>
      </div>
      <button class="justify-self-start" @click="() => resetFilters()">
        Clear
      </button>
      <div class="h-0 border-t-1 sm:col-span-3 md:col-span-5"></div>
      <ACard v-for="player of players" :key="`list-${player.id}`" class="shadow-none hover:(bg-gray-100 shadow-sm)"
        @mouseover.once="() => preloadPlayer(player.id)">
        <div class="a-card-body a-card-spacer ">
          <NuxtLink :to="`/players/${player.id}`" class="block text-high-emphasis">
            <div class="font-medium">
              <span>
                {{ player.first_name }}
                {{ player.last_name }}
              </span>
              <div class="text-sm text-medium-emphasis">
                {{ player.team_name }}
              </div>
            </div>
          </NuxtLink>
          <ABtn variant="light">Preview
            <AMenu :persist="true">
              <PlayerPreview class="p-4" :player-id="player.id" />
            </AMenu>
          </ABtn>
        </div>
      </ACard>
    </div>
    <div class="text-medium-emphasis mt-6">{{ total }} total players</div>
  </div>
</template>

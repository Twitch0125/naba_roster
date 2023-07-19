<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
const searchQuery = useRouteQuery("search", "");
const search = refDebounced(searchQuery, 300);
const team = useRouteQuery<string>("team", "any");
team.value = "any";

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
  }),
]);
const { data: players } = useNuxtData("players");
const { data: teams } = useNuxtData("teams");
const teamOptions = computed(() => [
  { id: "any", name: "Any" },
  ...teams.value,
]);
function preloadPlayer(id) {
  const playerKey = `player_${id}`;
  const { data: player } = useNuxtData(playerKey);

  !player.value &&
    useFetch(`/api/player/${id}`, {
      key: playerKey,
    });
}
</script>
<template>
  <div class="mt-12 mx-12">
    <div class="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      <h1 class="text-xl lg:text-3xl font-display self-end">
        North American Baseball Association
      </h1>
      <div class="md:(col-span-2 col-start-2)">
        <BaseInput
          id="search"
          v-model="searchQuery"
          block
          label="Search for players"
          type="search"
          name="search"
          placeholder="Search"
          icon="i-tabler-search"
        />
      </div>
      <div class="md:col-start-4 inline-flex items-end">
        <BaseSelect
          v-model="team"
          label="Team"
          value-attribute="id"
          option-attribute="name"
          :options="teamOptions"
        />
        <button class="theme.button-text" @click="()=>{searchQuery = ''; team = 'any'}">Clear</button>
      </div>
      <div
        class="h-0 theme.border border-t-1 sm:col-span-3 md:col-span-5"
      ></div>
      <NuxtLink
        v-for="player of players"
        :key="player.id"
        :to="`/players/${player.id}`"
        prefetch
        class="hover:(bg-gray-50 theme.border shadow-sm) transition duration-50 border-1 border-transparent rounded px-2.5 py-1.5 focus:ring ring-blue-900"
        @mouseover.once="() => preloadPlayer(player.id)"
      >
        <div class="font-medium">
          <span>
            {{ player.first_name }}
            {{ player.last_name }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          {{ player.team_name }}
        </div>
        <ClientOnly>
          <template #fallback>
            <button class="theme.button-text opacity-70 bg-transparent px-0">
              Preview
            </button>
          </template>
          <HeadlessPopover class="relative">
            <HeadlessPopoverButton>
              <button class="theme.button-text opacity-70 bg-transparent px-0">
                Preview
              </button>
            </HeadlessPopoverButton>
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <HeadlessPopoverPanel
                class="bg-white theme.border border-1 absolute z-10 left-1/2 -translate-x-1/2 transform p-3 w-sm shadow rounded"
              >
                <PlayerPreview class="p-4" :player-id="player.id" />
              </HeadlessPopoverPanel>
            </transition>
          </HeadlessPopover>
        </ClientOnly>
      </NuxtLink>
    </div>
    <div class="text-gray-600 mt-6">{{ total }} total players</div>
  </div>
</template>

<script lang="ts" setup>
const search = useSearchState();
const { data: total } = useLazyFetch("/api/players-total", { server: false });
await Promise.all([
  useFetch("/api/players", {
    key: "players",
    query: {
      search: search, //when search is updated this request will re-run
    },
  }),
  useFetch("/api/teams", {
    key: "teams",
  }),
]);
const { data: players } = useNuxtData("players");
const { data: teams } = useNuxtData("teams");
const updateSearch = useDebounceFn((event: Event) => {
  search.value = event.target!.value;
}, 200);
</script>
<template>
  <div class="mt-12 mx-12">
    <div class="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
      <div class="md:(col-span-2 col-start-2)">
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
      <div class="md:col-start-4">
        <BaseSelect
          label="Team"
          value-attribute="id"
          option-attribute="name"
          :options="teams"
        />
      </div>
      <div
        class="h-0 theme.border border-t-1 sm:col-span-3 md:col-span-5"
      ></div>
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
    <div class="text-gray-600 mt-6">{{ total }} total players</div>
  </div>
</template>

import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const player = db
    .select()
    .from(playersBasicStatsTable)
    .where(eq(playersBasicStatsTable.id, params.playerId))
    .get();
  return player;
});

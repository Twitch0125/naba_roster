import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);
  const player = db
    .select()
    .from(playersFullTable)
    .where(eq(playersFullTable.id, params.playerId))
    .get();
  setHeader(event, 'ETag', player.id)
  return player;
});

import { eq } from "drizzle-orm";

export default cachedEventHandler(
  defineEventHandler(async (event) => {
    const params = getRouterParams(event);
    const player = db
      .select()
      .from(playersFullTable)
      .where(eq(playersFullTable.id, params.playerId))
      .get();
    setHeader(event, "ETag", player.id);
    return player;
  }),
  { swr: true, maxAge: 60 * 60 * 24 * 7, headersOnly: true }
);

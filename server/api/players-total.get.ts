import { sql } from "drizzle-orm";

export default defineCachedEventHandler(
  (event) => {
    const { count } = db
      .select({ count: sql<number>`count(*)` })
      .from(playersTable)
      .get();
    return count;
  },
  { maxAge: 60 * 60 * 24 }
);

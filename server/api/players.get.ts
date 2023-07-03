import { like, and, asc, sql } from "drizzle-orm";
import { validateQuery, Type } from "h3-typebox";
export default eventHandler((event) => {
  const query = validateQuery(
    event,
    Type.Object({
      search: Type.String({ default: "" }),
    })
  );
  const nameClause = query.search
    ? like(playersTable.first_name, query.search)
    : undefined;
  const players = db
    .select()
    .from(playersTable)
    .where(and(nameClause))
    .orderBy(asc(playersTable.last_name));
  const statement = players.limit(27).all();
  const { count } = db
    .select({ count: sql<number>`count(*)` })
    .from(playersTable)
    .get();
  setResponseHeader(event, "X-Total-Count", count);
  return statement;
});

import { like, and, eq } from "drizzle-orm";
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
    .where(and(nameClause));
  const statement = players.limit(10).all();
  return statement;
});

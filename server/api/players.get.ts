import { like, and, asc, sql, or } from "drizzle-orm";
import { validateQuery, Type } from "h3-typebox";
export default eventHandler((event) => {
  const query = validateQuery(
    event,
    Type.Object({
      search: Type.String({ default: "" }),
    })
  );
  const firstNameSearch = like(playersTable.first_name, `%${query.search}%`);
  const lastNameSearch = like(playersTable.last_name, `%${query.search}%`);
  const firstLastNameSearch = sql`${playersTable.first_name} || ' ' || ${playersTable.last_name} LIKE ${query.search}`;
  const lastFirstNameSearch = sql`${playersTable.last_name} || ' ' || ${playersTable.first_name} LIKE ${query.search}`;


  // const nameClause = query.search ? nameSearch : undefined;
  const players = db
    .select()
    .from(playersTable)
    .where(or(firstNameSearch, lastNameSearch, firstLastNameSearch, lastFirstNameSearch))
    .orderBy(asc(playersTable.last_name));
  const statement = players.limit(27).all();
  const { count } = db
    .select({ count: sql<number>`count(*)` })
    .from(playersTable)
    .get();
  setResponseHeader(event, "X-Total-Count", count);
  return statement;
});

import { sql, asc, eq } from "drizzle-orm";
import { validateQuery, Type } from "h3-typebox";
export default eventHandler((event) => {
  const query = validateQuery(
    event,
    Type.Object({
      search: Type.String({ default: "" }),
      team: Type.String({ default: "" }),
    })
  );
  if (query.team.toLowerCase() === "any") {
    query.team = "";
  }
  let data;
  const teamQuery = sql.raw(`{team_id} : ^${query.team}`);
  const playerQuery = sql.raw(`{first_name last_name} : ^${query.search}*`);
  let fullQuery;
  if (query.team && query.search) {
    fullQuery = sql`${playerQuery} AND ${teamQuery}`;
  } else if (query.team) {
    fullQuery = teamQuery;
  } else if (query.search) {
    fullQuery = playerQuery;
  }
  if (fullQuery) {
    data = db.all(
      sql`select * from players_fts where players_fts MATCH '${fullQuery}' order by last_name asc limit 50`
    );
  } else {
    data = db
      .select()
      .from(playersFTSTable)
      .orderBy(asc(playersFTSTable.last_name))
      .limit(50)
      .all();
  }
  return data;
});

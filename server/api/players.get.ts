import { sql } from "drizzle-orm";
import { validateQuery, Type } from "h3-typebox";
export default eventHandler((event) => {
  const query = validateQuery(
    event,
    Type.Object({
      search: Type.String({ default: "" }),
    })
  );
  let data;
  if (query.search) {
    data = db.all(
      sql`select * from players_fts where players_fts MATCH ${
        "^" + query.search + "*"
      } ORDER BY last_name ASC`
    );
  } else {
    data = db.select().from(playersFTSTable).all();
  }
  return data;
});

import { asc } from "drizzle-orm";

export default defineEventHandler((event) => {
  return db.select().from(teamsTable).orderBy(asc(teamsTable.name)).all();
});

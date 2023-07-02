import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

const db = drizzle(new Database("sqlite.db"));

await migrate(db, { migrationsFolder: "drizzle" });

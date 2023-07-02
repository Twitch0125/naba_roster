import type { Config } from "drizzle-kit";

export default {
  schema: "./server/utils/db.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;

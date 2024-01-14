import type { Config } from "drizzle-kit";


// TODO: write a function to check if environment variables are undefined
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_DEVELOP_CONNECTON_STRING || "",
  },
} satisfies Config;

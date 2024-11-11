import "@/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: `${process.env.POSTGRES_URL}`,
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
});

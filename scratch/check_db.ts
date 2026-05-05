import { db } from "./lib/db/src/index.ts";
import { sql } from "drizzle-orm";

async function main() {
  const info = await db.run(sql`PRAGMA table_info(appointments)`);
  console.log(JSON.stringify(info, null, 2));
  process.exit(0);
}

main();

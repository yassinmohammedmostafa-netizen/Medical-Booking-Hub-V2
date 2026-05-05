import { db, usersTable } from "./lib/db/src/index.js";
import { eq } from "drizzle-orm";

async function main() {
  const admins = await db.select().from(usersTable).where(eq(usersTable.role, "admin"));
  console.log("Admins:", admins.map(a => ({ email: a.email, firstName: a.firstName })));
}

main().catch(console.error);

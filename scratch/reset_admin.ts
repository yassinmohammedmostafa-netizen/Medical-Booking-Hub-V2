
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { hashPassword } from "../artifacts/api-server/src/lib/auth";

async function reset() {
  const password = "admin123";
  const hash = await hashPassword(password);
  await db.update(usersTable).set({ passwordHash: hash }).where(eq(usersTable.email, "admin@esaal.com"));
  console.log("Admin password reset to admin123");
}

reset().catch(console.error);

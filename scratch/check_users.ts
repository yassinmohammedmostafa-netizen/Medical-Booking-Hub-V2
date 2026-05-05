
import { db, usersTable } from "@workspace/db";

async function check() {
  const users = await db.select().from(usersTable).limit(5);
  console.log(JSON.stringify(users, null, 2));
}

check().catch(console.error);

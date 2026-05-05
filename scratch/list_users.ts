import { db, usersTable } from "@workspace/db";

async function listUsers() {
  const users = await db.select().from(usersTable);
  console.log(JSON.stringify(users, null, 2));
  process.exit(0);
}

listUsers().catch(err => {
  console.error(err);
  process.exit(1);
});

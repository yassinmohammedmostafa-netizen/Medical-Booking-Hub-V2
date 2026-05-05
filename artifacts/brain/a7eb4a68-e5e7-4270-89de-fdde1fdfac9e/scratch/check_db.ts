import { createClient } from "@libsql/client";

async function main() {
  const client = createClient({ url: "file:D:/MedicalBooking-Hub/sqlite.db" });
  const res = await client.execute("PRAGMA table_info(users)");
  console.log(JSON.stringify(res.rows, null, 2));
}

main().catch(console.error);

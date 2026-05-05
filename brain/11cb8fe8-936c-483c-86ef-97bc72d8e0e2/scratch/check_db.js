const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('d:/MedicalBooking-Hub/api-server/sqlite.db');

db.all("SELECT id, email, created_at FROM users", [], (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.stringify(rows, null, 2));
  db.close();
});

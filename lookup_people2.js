const db = require('./lookup_people');

const name = process.argv[2];

db.byName(name, (err, nameResults) => {
  if (err) {
    console.log("error", err);
    db.close();
    return;
  }

  console.log(nameResults.rows);
  db.close();
});

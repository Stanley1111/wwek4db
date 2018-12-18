const name = process.argv[2];

const pg = require("pg");
const moment = require("moment");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
});

const byName = (name, callback) => {
  return client.query( "SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text",[name], callback);
};

function printNames(result) {
  console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);

  result.rows.forEach((element, i) => {
    console.log(`- ${i+1}: ${element.first_name} ${element.last_name}, born '${moment(element.birthdate).format("YYYY-MM-DD")}'
      `);
  });
  client.end();
}

byName(name);
//   console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
//   result.rows.forEach((element, i) => {
//     console.log(`- ${i+1}: ${element.first_name} ${element.last_name}, born '${moment(element.birthdate).format("YYYY-MM-DD")}'`);

//   });

//   client.end();
// });
//module.exports = {
//   byName,
//   close: () => { client.end(); }
// };

// module.exports = {
//   byName,
//   close: () => { client.end(); }
// };





// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   console.log("Searching...");

//   client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [name], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
//     result.rows.forEach((element, i) => {
//       console.log(`- ${i+1}: ${element.first_name} ${element.last_name}, born '${moment(element.birthdate).format("YYYY-MM-DD")}'`);

//     });

//     client.end();
//   });
// });
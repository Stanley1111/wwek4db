const fname = process.argv[2];
const lname = process.argv[3];
const bday = process.argv[4];

const moment = require("moment");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database : settings.database
  }
});

const newPerson = [{
  first_name: fname,
  last_name: lname,
  birthdate: bday
}];

knex('famous_people').insert(newPerson)
  .then( () => console.log("data inserted"))
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
      knex.destroy();
  })
;
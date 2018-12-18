const name = process.argv[2];


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

knex.select().from('famous_people').where('first_name', '=', name, 'OR', 'last_name', '=', name)
 .then((rows) => {
    printName(rows);
 })
 .finally(() => {
        knex.destroy();
    })
;

function printName(result){

  console.log(`Found ${result.length} person(s) by the name '${name}':`);
  result.forEach((element, i) => {
    console.log(`- ${i+1}: ${element.first_name} ${element.last_name}, born '${moment(element.birthdate).format("YYYY-MM-DD")}'`);
    });
}


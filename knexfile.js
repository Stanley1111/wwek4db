// Update with your config settings.
const settings = require("./settings"); // settings.json
module.exports = {

  development: {
    client: 'pg',
    connection: settings
  }

};

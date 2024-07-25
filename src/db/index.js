const UrlStore = require("./db.js");
const { dbPool } = require("../config/db.connect.js");

// Creates instance of Database class and
// exports it, to be used in the service class
const urlStore = new UrlStore({ dbPool });

module.exports = urlStore;

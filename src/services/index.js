const UrlService = require("./url.service.js");
const urlStore = require("../db/index.js");

// Creates instance of service instance class
// and export it
const urlService = new UrlService({ urlStore });

module.exports = urlService;

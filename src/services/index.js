import UrlService from "./url.service.js";
import urlStore from "../db/index.js";

// Creates instance of service instance class
// and export it
const urlService = new UrlService({ urlStore });

export default urlService;

import UrlStore from "./db.js";
import { dbPool } from "../config/db.connect.js";

// Creates instance of Database class and
// exports it, to be used in the service class
const urlStore = new UrlStore({ dbPool });

export default urlStore;

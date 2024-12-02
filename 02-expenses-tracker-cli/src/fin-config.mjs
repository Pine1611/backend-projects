import * as dotenv from "dotenv";
import path from "path";

dotenv.config();
// config data path
const FOLDER_NAME = process.env.FOLDER_NAME ? process.env.FOLDER_NAME : process.cwd() + "\\data-cli\\";
const FILE_NAME = process.env.FILE_NAME ? process.env.FILE_NAME : "expenses-tracker-data.json";
const FILE_PATH = path.join(FOLDER_NAME, FILE_NAME);

// config action
const ACTIONS = { add: "insert", edit: "update", del: "delete" };

export { FOLDER_NAME, FILE_NAME, FILE_PATH, ACTIONS };

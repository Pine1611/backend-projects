import * as dotenv from "dotenv";
dotenv.config();

const { DATA_PATH, DATA_FILE } = process.env;
export { DATA_PATH, DATA_FILE };

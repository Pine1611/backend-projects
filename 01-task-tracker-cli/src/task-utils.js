import * as config from "./task-config.js";
import fs from "fs";
import path from "path";

/**
 * In case run app in CMD Windows, .env can't load variables so I set default variables again. Data file will save to [task-tracker-data/tasks.json]
 * If run in terminal VS, everything fine just create .env file, set value DATA_PATH and DATA_FILE is what ever you want.
 */
const DATA_PATH =
    config.DATA_PATH === undefined
        ? process.cwd() + "/task-tracker-data/"
        : config.DATA_PATH;
const DATA_FILE =
    config.DATA_FILE === undefined ? "tasks.json" : config.DATA_FILE;
const filePath = path.join(DATA_PATH, DATA_FILE);

/**
 * @name init()
 * @desc Initial function
 * This func will check json data file exist, if file doesn't exit, will create folder data and json data file.
 */
export function init() {
    try {
        if (!fs.existsSync(filePath)) {
            // make directory data
            fs.mkdirSync(DATA_PATH);
            // create file
            let fileData = {
                tasks: [],
                totalTask: 0,
            };
            fs.writeFileSync(
                filePath,
                JSON.stringify(fileData, null, 4),
                "utf8"
            );
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @name readFileSync()
 * @desc Read data from data json file.
 * @returns return json parse data
 */
export function readFileSync() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error == "ENOENT") return;

        console.log("Error occurred while reading data file!", error);
        process.exit(1);
    }
}

/**
 * @name writeFileSync(param)
 * @desc Write file.
 * @param fileData object's data write to file
 */
export function writeFileSync(fileData) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 4), "utf8");
    } catch (error) {
        console.log(error);
        console.log("Error occurred while reading data file!");
        process.exit(1);
    }
}

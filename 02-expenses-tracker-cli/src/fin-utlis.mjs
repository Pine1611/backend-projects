import * as fs from "fs/promises";
import Table from "cli-table";

import * as config from "./fin-config.mjs";

/**
 * @name init()
 * @description For the first time running app, this function will check folder name and data file exist.
 */
export function init() {
    return new Promise((resolve) => {
        const stepInit = {
            isFolderExist: async () => {
                try {
                    await fs.access(config.FOLDER_NAME, fs.constants.F_OK);
                } catch (error) {
                    if (error.code === "ENOENT") {
                        console.log("Data directory doesn't exist!");
                        console.log("Initializing directory...");
                        const dataDir = await fs.mkdir(config.FOLDER_NAME, {
                            recursive: true,
                        });
                        console.log(`Data directory has been created: ${dataDir}`);
                    } else {
                        console.log(error);
                    }
                }
                stepInit.isFileExist();
            },
            isFileExist: async () => {
                try {
                    await fs.access(config.FILE_PATH, fs.constants.F_OK);
                    resolve(true);
                } catch (error) {
                    if (error.code === "ENOENT") {
                        console.log("Data file doesn't exist!");
                        console.log("Initializing new data file...");
                        const data = {
                            expenses: [],
                            categories: ["Everyday"],
                        };
                        await fs.writeFile(config.FILE_PATH, JSON.stringify(data, null, 4), {
                            flag: "w+",
                            encoding: "utf8",
                        });
                        console.log("Data file has been created: ", config.FILE_PATH);
                        resolve(true);
                    } else {
                        console.log("Something wrong when access file!");
                        resolve(false);
                    }
                }
            },
        };

        stepInit.isFolderExist();
    });
}

/**
 * This func will draw a data table
 * @param {Array} _head
 * @param {Array} _data
 */
export function drawDataTable(_head, _data) {
    let table = new Table({
        head: _head,
    });

    _data.forEach((element) => {
        table.push(element);
    });

    console.log(table.toString());
}

/**
 * Read JSON data file
 * @returns JSON string data
 */
export async function readDataFile() {
    try {
        const data = await fs.readFile(config.FILE_PATH, { encoding: "utf8" });
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("Files does not exist! Please re-check folder data");
        } else {
            console.log("Something wrong when CLI running!", error);
        }
        process.exit(1);
    }
}

/**
 * Write JSON data file
 * @param {JSON} _data
 */
export async function writeDataFile(_data) {
    try {
        await fs.writeFile(config.FILE_PATH, JSON.stringify(_data, null, 4), {
            flag: "w+",
            encoding: "utf8",
        });
    } catch (error) {
        console.log(error);
        console.log("Something wrong when writing data file!");
        process.exit(1);
    }
}

/**
 * This is function use for filter the expenses by category.
 * @param {String} _string string to search
 * @param {String} _term search term
 * @returns {boolean}
 */
export function filterData(_string, _term) {
    return _string.toLowerCase().includes(_term.toLowerCase());
}

/*********** TEST AREA  */
/**
 * Test function, I am thinking about use buffer to write data... not really finished
 * @param {*} _data
 * @param {*} _position
 * @returns
 */
export function caculatePosition(_data, _position) {
    let offset = 0;
    for (let i = 0; i < _position; i++) {
        offset += JSON.stringify(_data[i]).length + _position;
    }
    return offset;
}

export async function writeDataBuffer(_buffer) {
    try {
        await fs.writeFile(config.FILE_PATH, _buffer);
    } catch (error) {
        console.error(error);
    }
}

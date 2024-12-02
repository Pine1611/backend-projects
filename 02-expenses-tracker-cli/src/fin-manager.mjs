import * as rl from "readline";
import * as utils from "./fin-utlis.mjs";

/**
 * Find the expense and return the object expense by ID
 * @param {Number} _id
 * @returns {Object} expense by ID
 */
async function findExpByID(_id) {
    try {
        // parse id to int
        let findID = parseInt(_id);

        // exit if NaN
        if (isNaN(findID)) {
            console.error("Invalid ID! Please try again!");
            process.exit(1);
        }

        // read data
        const expenses = await utils.readDataFile().then((data) => {
            return data.expenses;
        });
        // initial results for search
        let results = {
            isExist: false,
            index: -1,
            details: null,
        };

        // loop and check if element exist
        expenses.forEach((element, index) => {
            if (element.id === findID) {
                results.isExist = true;
                results.index = index;
                results.details = element;
            }
        });

        // return results
        return results;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Show list of expenses or categories
 * @param {string} _type type of view list expenses or categories
 * @param {string} _filter search term, use for filter expenses
 * @returns data table
 */
export async function viewList(_type = null, _filter = null) {
    // read data file
    const data = await utils.readDataFile().then((data) => {
        if (_type !== null && _type === "exp") {
            return data.expenses;
        } else {
            return data.categories;
        }
    });

    // check if data is null
    if (data === undefined) {
        console.log("Files is corrupted!");
        console.log("Do you want to backup files?");
        return console.log("Here is feature will dev later! @Pine! !@@");
    }

    // initial table with head title
    let headTable = _type === "exp" ? ["ID", "Notes", "Amount", "Category"] : ["ID", "Category Name"];
    let dataTable = [];
    let tempTable = [];

    if (_filter) {
        // check if filter is number and search by ID or Category
        if (!isNaN(parseInt(_filter))) {
            let result = await findExpByID(_filter);
            if (result.isExist === true) {
                tempTable.push(result.details);
            } else {
                console.info("No results for expense by ID: ", _filter);
            }
        } else {
            console.log(data);

            data.filter((ele) => {
                // check filer string
                if (utils.filterData(ele.category, _filter)) {
                    // push matched data filter
                    tempTable.push(ele);
                }
            });

            tempTable.length > 0
                ? console.log(`This is list expenses by category: [${_filter}]`)
                : console.log("No expense for this category!");
        }
    } else {
        // get all list data
        // console.log("List all expenses!");

        tempTable = data;
    }

    // begin create row for data table
    tempTable.forEach((element, index) => {
        if (_type === "exp") {
            // row for expense
            dataTable.push([element.id, element.note, element.amount, element.category]);
        } else {
            // row for categories
            dataTable.push([index + 1, element]);
        }
    });

    // draw data to table
    if (dataTable.length > 0) {
        utils.drawDataTable(headTable, dataTable);
    }
}

/**
 * Manage categories with insert, update and delete method.
 * @param {String} _action
 * @param {Object} _value
 */
export function manageCategory(_action, _value) {
    try {
        // initial readline IO
        const readlineIO = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // initial confirm question
        const confirm = (str) => new Promise((resolve) => readlineIO.question(str, resolve));

        //begin step interact data
        const stepManage = {
            prepare: async () => {
                // read data file
                const data = await utils.readDataFile();

                // begin prepare interact category
                if (_action === "insert") {
                    // check if value option is null or not provide, set confirm to enter the title
                    if (_value.title.length === 0) {
                        _value.title = await stepManage.confirmCatName();
                    }
                    // push new item to array categories
                    data.categories.push(_value.title);

                    // call process insert
                    return stepManage.processManage(data);
                } else if (_action === "update") {
                    // update category
                    // get cat by id
                    let oldCatName = data.categories[_value.id - 1];
                    console.log(`The old title category is: ${oldCatName}`);
                    // set new category name
                    let newCatName = await stepManage.confirmCatName();
                    // change category name by index (id)
                    data.categories[_value.id - 1] = newCatName;

                    // call process update
                    return stepManage.processManage(data);
                } else if (_action === "delete") {
                    // delete category
                    // get index category need to delete
                    const index = data.categories.indexOf(data.categories[_value.id - 1]);
                    // check if category's id exist
                    if (index > -1) {
                        // confirm to delete
                        const answer = await confirm(
                            `Are you sure delete this category: ${_value.id} - ${
                                data.categories[_value.id - 1]
                            }? [Y/N] `
                        );
                        if (String(answer).trim().toLocaleLowerCase() === "y") {
                            let delCat = data.categories[_value.id - 1];
                            // remove category in array
                            data.categories.splice(index, 1);
                            console.log(`The category [${delCat}] has been deleted!`);
                            // call process to delete
                            return stepManage.processManage(data);
                        } else {
                            // no answer
                            return stepManage.end();
                        }
                    } else {
                        // the category doesn't exist
                        return stepManage.error("The category doesn't exist! Please try again!");
                    }
                }
            },
            confirmCatName: async () => {
                const answer = await confirm("Please enter the category's name: ");
                if (String(answer).trim().length === 0 || answer === null) {
                    stepManage.error("Category's name can't empty! Please try again!");
                    process.exit(1);
                } else {
                    return answer;
                }
            },
            processManage: async (_data) => {
                // begin write new data
                utils.writeDataFile(_data);

                if (_action === "insert") {
                    console.info(`Category created successfully (${_data.categories.at(-1)})`);
                } else if (_action === "update") {
                    console.info(`Category's name has been updated!`);
                }

                return stepManage.end();
            },
            error: async (_error) => {
                console.error(_error);
                return stepManage.end();
            },
            end: async () => {
                readlineIO.close();
            },
        };

        // initial manage category
        stepManage.prepare();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Manage expenses with insert, update and delete method.
 * @param {String} _action
 * @param {Object} _value
 */
export function manageExpenses(_action, _value) {
    try {
        // initial readline IO
        const readlineIO = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // initial confirm question
        const confirm = (str) => new Promise((resolve) => readlineIO.question(str, resolve));

        const stepManage = {
            // prepare data for process write file
            prepare: async () => {
                // read data
                const data = await utils.readDataFile();
                const categories = data.categories;
                const expenses = data.expenses;

                // insert data
                if (_action === "insert") {
                    // get the last ID record
                    let lastExp = expenses.at(-1);
                    let newID = !lastExp ? 1 : lastExp.id + 1;

                    // initial new object for update to data
                    let newExp = await stepManage.createExp(_value.amount, newID, categories);

                    // add new record
                    expenses.push(newExp);
                    // call func process to write data
                    return stepManage.processManage(data);
                } else if (_action === "update") {
                    // find exp by id and get data
                    let itemEdit = await findExpByID(_value.id);

                    // update info notes
                    console.log("Old note: ", itemEdit.details.note);
                    const newNote = await confirm(
                        "Please update new notes (enter if you don't want change the notes): \n"
                    );
                    if (String(newNote).trim().length === 0) {
                        // call update cate
                        console.log("Old category: ", itemEdit.details.category);
                        let newCat = await stepManage.selectCat(categories);
                        itemEdit.details.category = newCat;
                    } else {
                        // set new note
                        itemEdit.details.note = newNote;
                        // call update category
                        console.log("Old category: ", itemEdit.details.category);

                        let newCat = await stepManage.selectCat(categories);
                        itemEdit.details.category = newCat;
                    }

                    // set update item to data
                    expenses[itemEdit.index] = itemEdit.details;
                    // call to process
                    return stepManage.processManage(data);
                } else if (_action === "delete") {
                    // find and get record with ID
                    let itemDel = await findExpByID(_value.id);

                    // check if exist
                    if (itemDel.isExist) {
                        const answer = await confirm("Do you really want to delete this track? [Y/N] ");
                        if (String(answer).trim().toLocaleLowerCase() === "y") {
                            // remove item
                            data.expenses.splice(itemDel.index, 1);

                            console.info(`Expense track with ID [${itemDel.details.id}] deleted successfully!`);
                            // call process to write data
                            return stepManage.processManage(data);
                        } else {
                            return stepManage.end();
                        }
                    } else {
                        console.warn(`The expense with ID: ${_value.id} doesn't exist!`);
                        // process.exit(1);
                        return stepManage.end();
                    }
                }
            },
            createExp: async (_amount, _newID, _categories) => {
                let newExp = {
                    id: null,
                    note: null,
                    amount: null,
                    category: null,
                };

                if (isNaN(parseInt(_amount))) {
                    const answer = await confirm("Invalid amount! Please re-enter amount: ");
                    if (isNaN(parseInt(answer))) {
                        console.error("Invalid amount");
                        return stepManage.end();
                    } else {
                        newExp.amount = answer;
                    }
                } else {
                    newExp.amount = _value.amount;
                }

                newExp.id = _newID;
                newExp.note = await stepManage.addNote();
                newExp.category = await stepManage.selectCat(_categories);
                return newExp;
            },
            processManage: async (_data) => {
                console.log("Save new data here");
                // begin write new data
                utils.writeDataFile(_data);

                if (_action === "insert") {
                    console.log(`Expense created successfully (${_data.expenses.at(-1).id})`);
                } else if (_action === "update") {
                    console.log(`Expense has been updated!`);
                }

                return stepManage.end();
            },
            addNote: async (_oldNote) => {
                _oldNote ? console.log(`Old note: ${_oldNote}`) : "";
                const answer = await confirm(`Notes: `);
                if (String(answer).trim().length === 0) {
                    console.error("Note for expense can't empty!");
                    const keepInsert = await confirm(
                        "Do you want to re-enter note and continue insert expense? [Y/N] "
                    );
                    if (String(keepInsert).trim().toLocaleLowerCase() === "y") {
                        return stepManage.addNote(_oldNote);
                    } else {
                        return stepManage.end();
                    }
                } else {
                    return answer;
                }
            },
            selectCat: async (_categories) => {
                // print select categories
                _categories.forEach((cat, index) => {
                    console.log(`[${index + 1}] - ${cat}`);
                });
                // confirm select category
                const answer = await confirm(`Please select the category (1 - ${_categories.length}): `);
                // parse choice
                parseInt(answer);
                // check invalid answer
                if (isNaN(answer) || answer < 1 || answer > _categories.length) {
                    console.error("Invalid choice category!");
                    return stepManage.selectCat(_categories);
                } else {
                    // the choosen category add to data json here
                    // console.log(_categories[answer - 1]);
                    return _categories[answer - 1];
                }
            },
            end: async () => {
                readlineIO.close();
            },
        };

        stepManage.prepare();
    } catch (error) {
        console.error(error);
    }
}

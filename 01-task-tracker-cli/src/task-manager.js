import * as fs from "./task-utils.js";
import * as rl from "readline";

// First step for init app. This will create the data folder if it doesn't exist!
fs.init();

/**
 * @name findTaskByID(param)
 * @desc Find the task by ID. Check task is exist.
 * @param _taskID
 * @returns return task's status, index current task and current list tasks. [isExist, taskIndex, currentData]
 */
function findTaskByID(_taskID) {
    const data = fs.readFileSync();
    const results = {
        isExist: false,
        taskIndex: -1,
        currentData: data.tasks,
    };

    data.tasks.forEach((task, i) => {
        if (task.id == _taskID) {
            (results.isExist = true), (results.taskIndex = i);
        }
    });

    return results;
}

/**
 * @name viewTasks(param)
 * @desc Read data from data json file.
 * @param _filter status task for filter detail tasks
 * @returns return full list task if param is null or filter tasks base on status [todo, in-progress, done]
 */
export function viewTasks(_filter = null) {
    // read data
    const data = fs.readFileSync();
    let filtertTasks = data.tasks;
    let totalFilterTasks = 0;

    if (_filter) {
        filtertTasks = filtertTasks.filter((task) => task.status === _filter);
        totalFilterTasks = filtertTasks.length;
    }

    if (filtertTasks.length === 0) {
        console.log(`You have no tasks for [${_filter}]`);
    } else {
        if (_filter !== null)
            console.log(
                `You have total [${totalFilterTasks}] for [${_filter}]`
            );

        filtertTasks.forEach((task) => {
            console.log(
                `[${task.id}] [${task.status}] ${task.title} - Created at: [${task.createdAt}] - Updated at: [${task.updatedAt}]`
            );
        });
    }
}

/**
 * @name createTask()
 * @desc Create new task
 * @param _taskTitle
 */
export function createTask(_taskTitle = null) {
    try {
        // init readline IO
        const readlineIO = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // init confirm question
        const confirm = (str) =>
            new Promise((resolve) => readlineIO.question(str, resolve));

        // init steps create task
        const stepCreate = {
            start: async () => {
                return stepCreate.prepare();
            },
            prepare: async () => {
                // prepare data for create task
                let readData = fs.readFileSync();
                let tasks = readData.tasks;
                let lastTask = tasks.at(-1);
                let taskID = !lastTask ? 1 : lastTask.id + 1;

                // flow return
                if (_taskTitle === null) {
                    const answer = await confirm("Please enter task's title: ");
                    if (String(answer).trim().length === 0 || answer === null) {
                        return stepCreate.error(
                            "Task's title cannot empty, please try again!"
                        );
                    } else {
                        return stepCreate.process(taskID, answer, tasks);
                    }
                } else {
                    return stepCreate.process(taskID, _taskTitle, tasks);
                }
            },
            process: async (_taskID, _taskTitle, _tasks) => {
                try {
                    let currentDate = new Date().toLocaleString();
                    // setup new task data
                    let newTask = {
                        id: _taskID,
                        title: _taskTitle,
                        status: "todo",
                        createdAt: currentDate,
                        updatedAt: currentDate,
                    };
                    // add new task to current list task
                    _tasks.push(newTask);

                    // setup save data for write file
                    let saveData = {
                        tasks: _tasks,
                        totalTask: _tasks.length,
                    };
                    // write file
                    fs.writeFileSync(saveData);

                    console.log(
                        `Task created successfully (ID: ${newTask.id})`
                    );
                } catch (error) {
                    console.log(error);
                }
                return stepCreate.end();
            },
            error: async (_error) => {
                console.log(_error);
                const answer = await confirm(
                    "Do you want to enter task's title again? [Y/N] "
                );
                if (answer.toLowerCase() == "y") {
                    stepCreate.prepare();
                } else {
                    return stepCreate.end();
                }
            },
            end: async () => {
                readlineIO.close();
            },
        };

        // start step create task
        stepCreate.start();
    } catch (error) {
        console.log(error);
    }
}

/**
 * @name updateTask(param)
 * @desc Update status or title task by task ID,
 * @param [taskID, _dataUpdate]
 */
export function updateTask(_taskID, _dataUpdate = null) {
    try {
        let findTask = null;
        // init readlineIO and confirm question
        const readlineIO = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const confirm = (str) =>
            new Promise((resolve) => readlineIO.question(str, resolve));

        // setup steps update task
        const stepsUpdate = {
            start: async () => {
                return stepsUpdate.prepare();
            },
            prepare: async () => {
                // find the task by task ID
                findTask = findTaskByID(_taskID);
                // check task is exist
                if (!findTask.isExist) {
                    return stepsUpdate.error(
                        `Can not find any task with task ID: [${_taskID}], please try again!`
                    );
                }

                if (!_dataUpdate) {
                    const answer = await confirm(
                        `Please enter new title for task ID [${_taskID}]: `
                    );
                    if (String(answer).trim() === "" || answer === null) {
                        return stepsUpdate.error(
                            "The task's title can't empty. Please try again!"
                        );
                    } else {
                        _dataUpdate = { taskTitle: answer };
                    }
                }

                return stepsUpdate.process(
                    findTask.taskIndex,
                    findTask.currentData,
                    _dataUpdate
                );
            },
            process: async (_taskIndex, _tasks, _dataUpdate) => {
                // process update here
                let currentDate = new Date().toLocaleString();

                // setup task's data changed
                if (_dataUpdate.taskTitle)
                    _tasks[_taskIndex].title = _dataUpdate.taskTitle;
                if (_dataUpdate.taskStatus)
                    _tasks[_taskIndex].status = _dataUpdate.taskStatus;
                _tasks[_taskIndex].updatedAt = currentDate;

                // setup data for write file
                let saveData = {
                    tasks: _tasks,
                    totalTask: _tasks.length,
                };
                fs.writeFileSync(saveData);

                // return message success
                console.log(
                    `\tTask [${_tasks[_taskIndex].id}] has been updated!`
                );
                _dataUpdate.taskStatus
                    ? console.log(`\tStatus: [${_dataUpdate.taskStatus}]`)
                    : "";
                _dataUpdate.taskTitle
                    ? console.log(
                          `\tTitle changed to: [${_dataUpdate.taskTitle}]`
                      )
                    : "";

                return stepsUpdate.end();
            },
            error: async (_error) => {
                console.log(_error);
                return stepsUpdate.end();
            },
            end: async () => {
                // close readline IO
                return readlineIO.close();
            },
        };

        // start step update task
        stepsUpdate.start();
    } catch (error) {
        console.log(error);
    }
}

/**
 * @name deleteTask(param)
 * @desc Delete task by task ID,
 * @param _taskID
 */
export function deleteTask(_taskID) {
    try {
        let findTask = null;

        // create readline IO interface
        const readlineIO = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // setup question
        const question = (str) =>
            new Promise((resolve) => readlineIO.question(str, resolve));

        // setup steps for delete task by task ID
        const stepsDelete = {
            start: async () => {
                return stepsDelete.prepare();
            },
            prepare: async () => {
                // find task by id, and get result detail task
                findTask = findTaskByID(_taskID);

                // process
                if (!findTask.isExist) {
                    // invalid task's id
                    return stepsDelete.error(
                        "Invalid task ID. Please try again!"
                    );
                } else {
                    // confirm for delete task
                    const answer = await question(
                        "Are you sure want to delete this task? [Y/N] "
                    );
                    if (String(answer).trim().toLowerCase() === "y") {
                        return stepsDelete.process();
                    }

                    return stepsDelete.end();
                }
            },
            error: async (_error) => {
                console.log(_error);
                return stepsDelete.end();
            },
            process: async () => {
                // process delete task and save the data
                let tasks = findTask.currentData;
                tasks.splice(findTask.taskIndex, 1);

                let savedData = {
                    tasks: tasks,
                    totalTask: tasks.length,
                };
                fs.writeFileSync(savedData);

                console.log(`Deleted task [${_taskID}]`);

                return stepsDelete.end();
            },
            end: async () => {
                // close readline IO
                readlineIO.close();
            },
        };

        // init steps delete tasks
        stepsDelete.start();
    } catch (error) {
        console.log(error);
    }
}

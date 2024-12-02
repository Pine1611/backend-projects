#! /usr/bin/env node
import * as taskManager from "./src/task-manager.js";
const args = process.argv.slice(2);

switch (args[0]) {
    case "view":
        if (args.length === 1) {
            taskManager.viewTasks(null);
        } else if (!["todo", "in-progress", "done"].includes(args[1])) {
            console.log(
                "Invalid status provided. Valid status: todo, in-progress, done"
            );
            process.exit(1);
        } else {
            taskManager.viewTasks(args[1]);
        }
        break;

    case "create":
        if (args.length === 1) {
            taskManager.createTask(null);
        } else {
            const _taskTitle = args.slice(1).join(" ");
            taskManager.createTask(_taskTitle);
        }
        break;

    case "update":
        if (args.length < 2) {
            console.log("Please provide task ID for update!");
            process.exit(1);
        }
        taskManager.updateTask(args[1]);
        break;

    case "mark-in-progress":
        if (args.length < 2) {
            console.log("The task ID required!");
            process.exit(1);
        }
        taskManager.updateTask(args[1], { taskStatus: "in-progress" });
        break;

    case "mark-done":
        if (args.length < 2) {
            console.log("The task ID required!");
            process.exit(1);
        }
        taskManager.updateTask(args[1], { taskStatus: "done" });
        break;

    case "delete":
        if (args.length < 2) {
            console.log("Task ID required. Please provide the task ID!");
            process.exit(1);
        }
        taskManager.deleteTask(args[1]);
        break;

    case "help":
        displayHelp();
        break;

    default:
        console.log("Invalid usage of the cli command!");
        displayHelp();
}

function displayHelp() {
    console.log(`
        Useage: task-cli [options]

        Options:
            help                                Show help infomation.
            view [status]                       View tasks with status is optional.
            create [title]                      Create task with provided title task.
            update [id]                         Update task title with corresponding ID.
            mark-in-progress [id]               Mark task status is [in-progress] with corresponding ID.
            mark-done [id]                      Mark task status is [done] with corresponding ID.
            delete [id]                         Delete task with with corresponding ID.
    `);
}

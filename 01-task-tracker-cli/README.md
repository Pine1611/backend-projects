# CLI Task Tracker

This is simple **Command Line Interface (CLI)** app that help you to track and manage your to-do-list from the terminal. You can insert, update, delete and view to do list. As well as search tasks based on their status. Tasks stored in a JSON file (`tasks.json`), which will be automatically created in folder project.

Project based on [CLI Task Tracker][link-1] from [Roadmap Ideas Backend Projects][link-2]

## Features

-   [x] -   **List Tasks**: View all tasks, or search them by status (`todo`, `in-progress` or `done`).
-   [x] -   **Insert Task**: Create a new task in to-do-list with a title.
-   [x] -   **Update Task**: Mark a task as `todo`, `in-progress` or `done`. Also can change the title task by ID.
-   [x] -   **Delete Task**: Remove a task from to-do-list.

## Getting started

### Prerequisites

-   **Node.js**: installed on your machine (version 18 or higher).
-   **Dotenv**: This package loads environment variables from a file named ".env" into the Node.js process, making it easy to manage configurations.

### Installation

1. **Clone repository**
2. **Navigate to the project directory**

```bash
cd backend_projects/01-task-tracker-cli
npm install
# Install CLI to global
npm install --global
# Run dev
npm run start
```

When install `global`, the CLI created in `%APPDATA%\Roaming\npm\%node_module%` and can use `task-cli` in Terminal(VS) or CMD(Windows)<sup>[notes](#notes)</sup>

### Useage

You can interact with Task-Tracker-CLI app via follow commands.

#### 1. **Show the help**

```bash
# For the first time with this app, you can use this command for help.
task-cli help
```

#### 2. **View all tasks or filter by task's status**

```bash
# List all the tasks or filter task by [status] (`todo`, `in-progress` or `done`).
task-cli view [status]
```

#### 3. **Interact with data**

```bash
# Create a new task with the title
task-cli create
# Update task's title by id
task-cli update [id]
# Update status for task by id
task-cli mark-in-progress [id]
task-cli mark-done [id]
# Delete task by id
task-cli delete [id]
```

## Notes

1. All tasks are stored in `./task-tracker-data/tasks.json`. You can config location store data by create `.env` file and setup enviroment variables [`DATA_PATH`, `DATA_FILE`]. If run in CMD (Windows), tasks are stored in `%USERDATA%/task-tracker-data/tasks.json`.
2. Still have some problems with this project, I'm still thinking about it and will update in next version!

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Author

Iam Pine

---

Happy task tracking!

[link-1]: https://roadmap.sh/projects/task-tracker
[link-2]: https://roadmap.sh/projects?g=backend

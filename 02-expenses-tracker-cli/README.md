# Personal Finance Tracker

This is simple application to manage your finances. The application allow user to add, update, delete and view their expense everyday. Also can provide summary of the expense. Expenses data will stored in a JSON files, which will be automatically created in folder project.

Project based on [Expense Tracker](https://roadmap.sh/projects/expense-tracker) from [Roadmap Ideas Backend Projects][link-2]

## Features

### ONGOING develop the advanced features <sup>[notes](#notes)</sup>

-   [x] **Can CRUD categories**: allow user view, create, update and delete an expense category
-   [x] **Can create an expense**: insert an expense with a category and amount
-   [x] **Can update an expense**: update category or amount of expense by id
-   [x] **Can delete an expense**: delete an expense by id
-   [x] **View expenses**: allow show all of expense, also filter by id or category
-   [ ] **Set budget**: allow set budget for each month and show warning when the user exceeds the budget
-   [ ] **Export data**: user can export data to CSV file
-   [ ] **View summary**: user can view summary of all expense or filter by day/month (of current year)

## Getting started

### Prerequisites

-   1.**Node.js** Installed on your machine (version 18 or higher).
-   2.**DotENV** This package loads environment variables from a file named ".env" into the Node.js process, making it easy to manage configurations.
-   3.**Commander** The complete solution for Node.js command-line interfaces.
-   4.**CLI Table** This utility allows you to render unicode-aided tables on the command line from your Node.js scripts.

### Installation

-   1.**Clone the reposity** or **Copy the folder project to your root**
-   2.**Navigate to the project directory**

```bash
cd backend-projects/02-expenses-tracker-cli
# install dependencies packages
npm install
# link to use cli `fin-track`
npm link
# start the app in terminal
npm run start
```

### Usage

You can interact with Personal Finance Tracker app via follow commands.

```bash
# show the help
fin-track help
# show list or filter data
fin-track view [options] [value]
# create new data
fin-track create [options] [value]
# update data by id or name
fin-track update [options] [value]
# delete data by id
fin-track delete [options] [value]
```

## Notes

For now, this is the first version of the app. I'm dedicated to making it better. Expect more advanced features in the future.

1. All tasks are stored in `./data/data.json`. You can config location store data by create `.env` file and setup enviroment variables [`FOLDER_NAME`, `FILE_NAME`]. If run in CMD (Windows), tasks are stored in `%USERDATA%/data/data.json`.
2. May be still have problems with this app, I'm still thinking about it and will update in next version, also include more advanced features.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Author

Iam Pine

---

Happy tracking!

[link-1]: https://roadmap.sh/projects/expense-tracker
[link-2]: https://roadmap.sh/projects?g=backend

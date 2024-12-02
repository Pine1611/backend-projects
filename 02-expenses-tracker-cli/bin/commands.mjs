#!/usr/bin/env node
import { Command, Option } from "commander";
import * as manager from "../src/fin-manager.mjs";
import { ACTIONS } from "../src/fin-config.mjs";

export async function createCommands(_args) {
    const program = new Command();
    const args = _args.slice(2);

    program.name("fin-track").description("Ok, this is desc for CLI command!").version("1.0.0");

    // create commands
    program
        .command("create")
        .description("Create a new category or expense!")
        .option("-c, --category [name_category]", "Create new category.")
        .option("-e, --expense <amount>", "Create new expense.")
        .action((_opts, _cmd) => {
            // join spaces if string value don't have `quote [""]`
            const value = args.slice(2).join(" ");

            if (Object.keys(_opts).length === 0) {
                console.error("Please provice option you want to create!");
                _cmd.help();
                process.exit(1);
            }
            if (_opts.category) {
                // call create category func
                manager.manageCategory(ACTIONS.add, {
                    title: String(value).trim(),
                });
            } else if (_opts.expense) {
                console.log("Expense created!", value);
                console.log("Call create expense func!");
                manager.manageExpenses(ACTIONS.add, { amount: value });
            }
        });

    // update commands
    program
        .command("update")
        .description("Update a category or expense by ID")
        .option("-c, --category <id>", "Update a category by ID")
        .option("-e, --expense <id>", "Update a expense by ID")
        .action((_opts, _cmd) => {
            if (Object.keys(_opts).length === 0) {
                console.error("Please provide options you want to update!");
                _cmd.help();
                process.exit(1);
            }

            if (_opts.category) {
                let catID = parseInt(_opts.category);
                if (isNaN(catID)) {
                    console.error("Invalid ID number, please try again!");
                    process.exit(1);
                } else {
                    manager.manageCategory(ACTIONS.edit, {
                        id: _opts.category,
                    });
                }
            } else if (_opts.expense) {
                let expID = parseInt(_opts.expense);
                if (isNaN(expID)) {
                    console.error("Invalid ID number, please try again");
                } else {
                    manager.manageExpenses(ACTIONS.edit, {
                        id: _opts.expense,
                    });
                }
            }
        });

    // delete commands
    program
        .command("delete")
        .description("Delete a category or expenses by ID")
        .option("-c, --category <id>", "Delete a category by ID")
        .option("-e, --expense <id>", "Delete a expense by ID")
        .action((_opts, _cmd) => {
            if (Object.keys(_opts).length === 0) {
                console.error("Please provide options you want to delete!");
                _cmd.help();
                process.exit(1);
            }

            if (_opts.category) {
                let catID = parseInt(_opts.category);
                if (isNaN(catID)) {
                    console.error("Invalid ID number, please try again!");
                    process.exit(1);
                } else {
                    manager.manageCategory(ACTIONS.del, {
                        id: _opts.category,
                    });
                }
            } else if (_opts.expense) {
                let expID = parseInt(_opts.expense);
                if (isNaN(expID)) {
                    console.error("Invalid ID! Please try again!");
                    program.exit(1);
                } else {
                    manager.manageExpenses(ACTIONS.del, {
                        id: _opts.expense,
                    });
                }
            }
        });

    // view commands
    program
        .command("view")
        .description("View list categories or list expenses!")
        .option("-c, --cat", "View list categories!")
        .option("-e, --exp [value]", "View list expenses. Also can filter by category!")
        .action((_opts, _cmd) => {
            let type = null;
            let filter = null;
            if (Object.keys(_opts).length === 0) {
                console.error("Please provide options you want to view!");
                _cmd.help();
                process.exit(1);
            }

            if (_opts.cat) {
                // console.debug("debug");
                // console.warn("warning");
                // console.error("error");
                // console.log("log");
                // console.info("info");

                console.log("Here is full list of categories!");
                type = "cat";
            } else if (_opts.exp) {
                type = "exp";
                filter = args.slice(2).join(" ");
            }
            // call view list
            manager.viewList(type, filter);
        });

    program.parse(_args);
}

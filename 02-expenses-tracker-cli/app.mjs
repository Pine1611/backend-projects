#! /usr/bin/env node
import * as commands from "./bin/commands.mjs";
import * as utils from "./src/fin-utlis.mjs";

// init and run app
utils.init().then((result) => {
    if (result) {
        // start create commands
        commands.createCommands(process.argv);
    }
});

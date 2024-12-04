import express from "express";
import cors from "cors";
import helmet from "helmet";

import { SERVER_PORT } from "./configs/global.config.mjs";
import { notFound } from "./middlewares/notFound.mjs";
import { handleError } from "./middlewares/handleError.mjs";
import { Converter } from "./converter/index.router.mjs";

/**
 * @description initial configs server
 */
const PORT = SERVER_PORT === undefined ? 3000 : SERVER_PORT;
const server = express();

const corsOptions = {
    origin: "https://localhost:3000",
    optionsSuccessStatus: 200,
};

/**
 * @description import middlewares
 */
server.use(cors());
server.disable("x-powered-by");
server.use(express.json());
server.use(helmet());

/**
 * @description Begin for API routes
 */
server.get("/", (req, res, next) => {
    try {
        return res.status(200).json({ message: "Server connected!" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

Converter(server);

/**
 * @description Response for route not found and handle error when something went wrong!
 */
server.use(notFound);
server.use(handleError);

/**
 * @description Startup Server
 * For the first, listening and start up server via port in .env files
 * And the second, checking if error catch up port in use, just reconnect with default port.
 */
server
    .listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
    .on("error", (_error) => {
        if (_error.code === "EADDRINUSE") {
            console.error("Server port in use, reconnecting...");
            setTimeout(() => {
                server.listen(3001, () => {
                    console.log(`Server running on port: ${3001}`);
                });
            }, 3000);
        } else {
            console.error("Something went wrong with server, please try again later!");
        }
    });

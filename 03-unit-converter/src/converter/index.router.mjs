import express from "express";
import { validateUnitSystem } from "../middlewares/handleValidator.mjs";
import * as IndexController from "./index.controller.mjs";

export const Converter = (server) => {
    const routerIndex = express.Router();

    routerIndex
        .route("/:unitSystem/:fromUnit-:toUnit/:valueConvert")
        .get(validateUnitSystem, IndexController.getConverter);

    server.use("/api/converter", routerIndex);

    server.get("/api/symbols/:unitSystem", IndexController.getSymbols);
    server.get("/api/measurement", IndexController.getMeasurement);
};

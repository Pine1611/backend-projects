import { DECIMAL_DIGITS, SYSTEMS_OF_MEASUREMENT } from "../configs/global.config.mjs";
import { tryCatchWrapper } from "../middlewares/tryCatchWrapper.mjs";
import formatResult from "../utils/formatResult.mjs";
import { createCustomError } from "../utils/customError.mjs";

import { LENGTH_SYSTEM_V1 } from "./length/length.model.mjs";
import { execLengthConverter } from "./length/length.converter.mjs";

import { TEMPERATURE_SYSTEM } from "./temperature/temperature.model.mjs";
import { execTemperatureConverter } from "./temperature/temperature.converter.mjs";

export const getConverter = tryCatchWrapper(async (req, res, next) => {
    const { unitSystem, dataConvertValid, unitsDetail } = req.validData;
    let valueConverted = 0;
    if (unitSystem === SYSTEMS_OF_MEASUREMENT.LENGTH) {
        valueConverted = formatResult(execLengthConverter(dataConvertValid), DECIMAL_DIGITS);
    } else if (unitSystem === SYSTEMS_OF_MEASUREMENT.TEMPERATURE) {
        valueConverted = formatResult(execTemperatureConverter(dataConvertValid), DECIMAL_DIGITS);
    }
    return res.status(200).json({ valueConverted: valueConverted });
});

export const getSymbols = tryCatchWrapper(async (req, res, next) => {
    const { unitSystem } = req.params;
    let unitSymbols = [];
    switch (unitSystem.toString().toLowerCase().trim()) {
        case SYSTEMS_OF_MEASUREMENT.LENGTH:
            LENGTH_SYSTEM_V1.forEach((element) => {
                unitSymbols.push(element.symbol);
            });
            return res.status(200).json({ symbols: unitSymbols });

        case SYSTEMS_OF_MEASUREMENT.TEMPERATURE:
            TEMPERATURE_SYSTEM.forEach((element) => {
                unitSymbols.push(element.symbol);
            });
            return res.status(200).json({ symbols: unitSymbols });

        default:
            return next(createCustomError("invalid_measurement", 422));
    }
});

export const getMeasurement = tryCatchWrapper(async (_req, res) => {
    const measurement = Object.values(SYSTEMS_OF_MEASUREMENT);
    return res.status(200).json({ measurement: measurement });
});

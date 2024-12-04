import { tryCatchWrapper } from "./tryCatchWrapper.mjs";
import { createCustomError } from "../utils/customError.mjs";

import { SYSTEMS_OF_MEASUREMENT } from "../configs/global.config.mjs";
import { LENGTH_SYSTEM_V1 } from "../converter/length/length.model.mjs";

import findWithArray from "../utils/findWithArray.mjs";
import { TEMPERATURE_SYSTEM } from "../converter/temperature/temperature.model.mjs";

export const validateUnitSystem = tryCatchWrapper(async (req, res, next) => {
    const { unitSystem, fromUnit, toUnit, valueConvert } = req.params;

    // units detail initial
    const unitsDetail = {
        from: null,
        to: null,
    };
    const dataConvertValid = {
        // valueConvert: null,
        // fromPower: null,
        // toPower: null,
        // metresPower: null,
        // classConverter: null,
        // methodConverter: null,
    };

    // value convert check valid
    if (isNaN(valueConvert) || valueConvert === "" || valueConvert < 0) {
        return next(createCustomError("invalid_number", 422));
    } else {
        dataConvertValid.valueConvert = Number(valueConvert);
    }

    switch (String(unitSystem).trim()) {
        case SYSTEMS_OF_MEASUREMENT.LENGTH:
            // check units is exist in LENGHT SYSTEM by symbol
            unitsDetail.from = findWithArray(LENGTH_SYSTEM_V1, "symbol", String(fromUnit).trim());
            unitsDetail.to = findWithArray(LENGTH_SYSTEM_V1, "symbol", String(toUnit).trim());

            // return error if units not exist
            if (unitsDetail.from === -1 || unitsDetail.to === -1) return next(createCustomError("invalid_unit", 422));

            // class and method check
            // check class
            if (unitsDetail.from.unitSystem == unitsDetail.to.unitSystem) {
                dataConvertValid.classConverter = "sameSystem";
            } else {
                dataConvertValid.classConverter = "differentSystem";
            }
            // check method
            if (unitsDetail.from.unitSystem === "metric-system" && unitsDetail.to.unitSystem === "metric-system") {
                dataConvertValid.methodConverter = "inMetricSystem";
            } else if (
                unitsDetail.from.unitSystem === "imperial-system" &&
                unitsDetail.to.unitSystem === "imperial-system"
            ) {
                dataConvertValid.methodConverter = "inImperialSystem";
            } else if (
                unitsDetail.from.unitSystem == "metric-system" &&
                unitsDetail.to.unitSystem == "imperial-system"
            ) {
                dataConvertValid.methodConverter = "fromMetricToImperial";
            } else if (
                unitsDetail.from.unitSystem == "imperial-system" &&
                unitsDetail.to.unitSystem == "metric-system"
            ) {
                dataConvertValid.methodConverter = "fromImperialToMetric";
            }

            // from/to/metres Power
            dataConvertValid.fromPower = unitsDetail.from.power;
            dataConvertValid.toPower = unitsDetail.to.power;
            dataConvertValid.metresPower = unitsDetail.from.hasOwnProperty("metres")
                ? unitsDetail.from.metres
                : unitsDetail.to.metres;

            break;

        case SYSTEMS_OF_MEASUREMENT.TEMPERATURE:
            // check units is exist in LENGHT SYSTEM by symbol
            unitsDetail.from = findWithArray(TEMPERATURE_SYSTEM, "symbol", String(fromUnit).trim());
            unitsDetail.to = findWithArray(TEMPERATURE_SYSTEM, "symbol", String(toUnit).trim());

            // return error if units not exist
            if (unitsDetail.from === -1 || unitsDetail.to === -1) return next(createCustomError("invalid_unit", 422));

            if (unitsDetail.from.symbol === "C") {
                dataConvertValid.classConverter = "CelsiusConverter";
                dataConvertValid.fromFreezePoint = unitsDetail.from.freezePoint;
                dataConvertValid.toFreezePoint = unitsDetail.to.freezePoint;
                if (unitsDetail.to.symbol === "K") {
                    dataConvertValid.methodConverter = "toKevin";
                } else if (unitsDetail.to.symbol === "F") {
                    dataConvertValid.methodConverter = "toFahrenheit";
                } else {
                    dataConvertValid.classConverter = "TemperatureConverter";
                    dataConvertValid.methodConverter = "toCelsius";
                }
            } else if (unitsDetail.from.symbol === "K") {
                dataConvertValid.classConverter = "KelvinConverter";
                dataConvertValid.fromFreezePoint = unitsDetail.from.freezePoint;
                dataConvertValid.toFreezePoint = unitsDetail.to.freezePoint;
                if (unitsDetail.to.symbol === "C") {
                    dataConvertValid.methodConverter = "toCelsius";
                } else if (unitsDetail.to.symbol === "F") {
                    dataConvertValid.methodConverter = "toFahrenheit";
                } else {
                    dataConvertValid.classConverter = "TemperatureConverter";
                    dataConvertValid.methodConverter = "toKevin";
                }
            } else if (unitsDetail.from.symbol === "F") {
                dataConvertValid.classConverter = "FahrenheitConverter";
                dataConvertValid.fromFreezePoint = unitsDetail.from.freezePoint;
                dataConvertValid.toFreezePoint = unitsDetail.to.freezePoint;
                if (unitsDetail.to.symbol === "C") {
                    dataConvertValid.methodConverter = "toCelsius";
                } else if (unitsDetail.to.symbol === "K") {
                    dataConvertValid.methodConverter = "toKevin";
                } else {
                    dataConvertValid.classConverter = "TemperatureConverter";
                    dataConvertValid.methodConverter = "toFahrenheit";
                }
            }

            break;

        default:
            next(createCustomError("invalid_measurement", 422));
            break;
    }
    // setup units detail data for request
    const validReqData = {
        unitSystem: String(unitSystem).trim(),
        unitsDetail: unitsDetail,
        dataConvertValid: dataConvertValid,
    };
    req.validData = validReqData;
    // return res.status(200).json({ data: validReqData });
    next();
});

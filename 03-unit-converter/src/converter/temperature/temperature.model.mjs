/**
 * Define the temperature system of measurement
 * Notes: This system of measurement definition is based on my reaseach on the following these pages: Wikipedia and CueMath.
 * Please check these links:
 * Wikipedia: https://en.wikipedia.org/wiki/Metric_system
 * CueMath: https://www.cuemath.com/measurement/
 * Author: I am Pine
 * Github: https://github.com/Pine1611
 * Happy Coding!
 */

import {
    CelsiusConverter,
    FahrenheitConverter,
    KelvinConverter,
    TemperatureConverter,
} from "./temperature.converter.mjs";

const TEMPERATURE_SYSTEM = [
    { name: "Kelvin", type: "temperature", symbol: "K", absZero: 0, freezePoint: 273.15 },
    { name: "Celsius", type: "temperature", symbol: "C", absZero: -273.15, freezePoint: 0 },
    { name: "Fahrenheit", type: "temperature", symbol: "F", absZero: -459.67, freezePoint: 32 },
];

/**
 * Maping with method to excute converter
 */
const methodTemperatureConverterMap = {
    toCelsius: "toCelsius",
    toKevin: "toKevin",
    toFahrenheit: "toFahrenheit",
};
/**
 * Mapping with class for convert in unit of measurement
 */
const classTemperatureConverterMap = {
    TemperatureConverter: TemperatureConverter,
    CelsiusConverter: CelsiusConverter,
    KelvinConverter: KelvinConverter,
    FahrenheitConverter: FahrenheitConverter,
};

export { TEMPERATURE_SYSTEM, methodTemperatureConverterMap, classTemperatureConverterMap };

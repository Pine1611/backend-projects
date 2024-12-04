/**
 * Define the length system of measurement
 * Notes: This system of measurement definition is based on my reaseach on the following these pages: Wikipedia and CueMath.
 * Please check these links:
 * Wikipedia: https://en.wikipedia.org/wiki/Metric_system
 * CueMath: https://www.cuemath.com/measurement/
 * Author: I am Pine
 * Github: https://github.com/Pine1611
 * Happy Coding!
 */

import { BaseUnitConverter, DifferentUnitConverter } from "./length.converter.mjs";

const LENGTH_SYSTEM_V1 = [
    { name: "kilo", type: "metric-system", symbol: "km", power: 3 },
    { name: "hecto", type: "metric-system", symbol: "hm", power: 2 },
    { name: "deca", type: "metric-system", symbol: "dam", power: 1 },
    { name: "meter", type: "metric-system", symbol: "m", power: 0 }, // base unit in the metric system
    { name: "deci", type: "metric-system", symbol: "dm", power: -1 },
    { name: "centi", type: "metric-system", symbol: "cm", power: -2 },
    { name: "milli", type: "metric-system", symbol: "mm", power: -3 },
    { name: "inch", type: "imperial-system", symbol: "in", power: 1 / 12, metres: 0.0254 }, // base unit in the imperial system
    { name: "foot", type: "imperial-system", symbol: "ft", power: 1, metres: 0.3048 },
    { name: "yard", type: "imperial-system", symbol: "yd", power: 3, metres: 0.9144 },
    { name: "mile", type: "imperial-system", symbol: "mi", power: 5280, metres: 1609.344 },
];
// test unit system v2... not sure it possible... :() still thinking about this
const UNIT_SYSTEM_V2 = {
    metric: [
        { name: "kilo", symbol: "km", power: 3 },
        { name: "hecto", symbol: "km", power: 3 },
    ],
    imperial: [{ name: "inch", symbol: "in", power: 1 / 12 }],
};
// end test

/**
 * Maping with function to excute converter in measurement units
 * In my research, I gave four types of conversion:
 * The same conversion system of units are:
 * => `Metric System` and `Imperial System`
 * The different conversion bettween system of units are:
 * => from `Metric System` to `Imperial System` and on the contrary
 */
const methodConverterMap = {
    inMetricSystem: "inMetricSystem",
    inImperialSystem: "inImperialSystem",
    fromMetricToImperial: "fromMetricToImperial",
    fromImperialToMetric: "fromImperialToMetric",
};
/**
 * Mapping with class bettween same system or different system
 * I create two classes, the base class use for conversion in the same system of units
 * and the different unit converter class will be use if its is different system of units
 */
const classConverterMap = {
    sameSystem: BaseUnitConverter,
    differentSystem: DifferentUnitConverter,
};

export { LENGTH_SYSTEM_V1, methodConverterMap, classConverterMap };

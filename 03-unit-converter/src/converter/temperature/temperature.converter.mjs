/**
 * All calculation formulas based on my research through Wikipedia and Cuemath site
 * Please read these links for more detail:
 * Wikipedia: https://en.wikipedia.org/wiki/Metric_system
 * CueMath: https://www.cuemath.com/measurement/
 * Author: I am Pine
 * Github: https://github.com/Pine1611
 * If you copy and use my calculation formulas, please cite the source. Thanks you very much!
 * Happy Coding!
 */

import { classTemperatureConverterMap, methodTemperatureConverterMap } from "./temperature.model.mjs";

/**
 * TemperatureConverter Class
 * This class will use for conversion in the same measurement units system
 */
class TemperatureConverter {
    constructor(valueConvert, fromFreezePoint, toFreezePoint, absZero) {
        this.valueConvert = Number(valueConvert);
        this.fromFreezePoint = Number(fromFreezePoint);
        this.toFreezePoint = Number(toFreezePoint);
        this.absZero = Number(absZero);
    }
    toCelsius() {
        return this.valueConvert;
    }
    toKevin() {
        return this.valueConvert;
    }
    toFahrenheit() {
        return this.valueConvert;
    }
}

class CelsiusConverter extends TemperatureConverter {
    constructor(valueConvert, fromFreezePoint, toFreezePoint) {
        super(valueConvert, fromFreezePoint, toFreezePoint);
    }

    toKevin() {
        return this.valueConvert + this.toFreezePoint;
    }
    toFahrenheit() {
        return this.valueConvert * 1.8 + this.toFreezePoint;
    }
}

class KelvinConverter extends TemperatureConverter {
    constructor(valueConvert, fromFreezePoint, toFreezePoint) {
        super(valueConvert, fromFreezePoint, toFreezePoint);
    }
    toCelsius() {
        return this.valueConvert - this.fromFreezePoint;
    }
    toFahrenheit() {
        return (this.valueConvert - this.fromFreezePoint) * 1.8 + this.toFreezePoint;
    }
}

class FahrenheitConverter extends TemperatureConverter {
    constructor(valueConvert, fromFreezePoint, toFreezePoint) {
        super(valueConvert, fromFreezePoint, toFreezePoint);
    }
    toCelsius() {
        return (this.valueConvert - this.fromFreezePoint) / 1.8;
    }
    toKevin() {
        return (this.valueConvert - this.fromFreezePoint) / 1.8 + this.toFreezePoint;
    }
}

/**
 * Initial and execute for conversion, based on mapping with class converter
 * @param {Number} valueConvert value need to convert
 * @param {Number} fromFreezePoint from freeze point
 * @param {Number} toFreezePoint to freeze point
 * @param {String} classConverter use for mapping with class converter
 * @param {String} methodConverter use for mapping with method converter
 * @returns Result value converted
 */
const execTemperatureConverter = ({
    valueConvert,
    fromFreezePoint,
    toFreezePoint,
    classConverter,
    methodConverter,
}) => {
    // initial conversion and return result converted by mapping class and method
    const converter = new classTemperatureConverterMap[classConverter](valueConvert, fromFreezePoint, toFreezePoint, 0);
    return converter[methodTemperatureConverterMap[methodConverter]]();
};

export { TemperatureConverter, CelsiusConverter, KelvinConverter, FahrenheitConverter, execTemperatureConverter };

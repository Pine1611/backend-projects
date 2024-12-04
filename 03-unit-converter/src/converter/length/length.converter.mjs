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

import { classConverterMap, methodConverterMap } from "./length.model.mjs";

/**
 * BaseUnitConverter Class
 * This class will use for conversion in the same measurement units system
 * Constructor: set 3 base params, `value` need to convert, power of `from` and `to` units.
 */
class BaseUnitConverter {
    constructor(valueConvert, fromPower, toPower) {
        this.valueConvert = Number(valueConvert);
        this.fromPower = Number(fromPower);
        this.toPower = Number(toPower);
    }

    /**
     * Conversion in the same Metric System Unit
     * @returns Number
     */
    inMetricSystem() {
        return this.valueConvert * (10 ** this.fromPower / 10 ** this.toPower);
    }
    /**
     * Conversion in the same Imperial System Unit
     * @returns Number
     */
    inImperialSystem() {
        return this.valueConvert * (this.fromPower / this.toPower);
    }
}

/**
 * DifferentUnitConverter Class
 * This class extend from BaseUnitConverter will use for conversion in the different measurement units system.
 * Constructor: 3 base params, `value` need to convert, power of `from` and `to` unit.
 * Adding `metric` power, this value help convert between metric system and imperial.
 */
class DifferentUnitConverter extends BaseUnitConverter {
    constructor(valueConvert, fromPower, toPower, metresPower) {
        super(valueConvert, fromPower, toPower);
        this.metresPower = metresPower;
    }
    /**
     * Conversion in the different system unit - from metric to imperial unit
     * @returns Number
     */
    fromMetricToImperial() {
        return this.valueConvert * (10 ** this.fromPower / this.metresPower);
    }
    /**
     * Conversion in the different system unit - from imperial to metric unit
     * @returns Number
     */
    fromImperialToMetric() {
        return this.valueConvert * (this.metresPower / 10 ** this.toPower);
    }
}

/**
 * Initial and execute for conversion, based on mapping with class converter in the same or different system unit and mapping with the conversion calculation formulas method
 * @param {Number} valueConvert value need to convert
 * @param {Number} fromPower power of from unit
 * @param {Number} toPower power of to unit
 * @param {Number} metresPower metres power, this value use for conversion bettween different system unit
 * @param {String} classConverter use for mapping with class converter
 * @param {String} methodConverter use for mapping with method converter
 * @returns Result value converted
 */
const execLengthConverter = ({ valueConvert, fromPower, toPower, metresPower, classConverter, methodConverter }) => {
    // initial conversion and return result converted by mapping class and method
    const converter = new classConverterMap[classConverter](valueConvert, fromPower, toPower, metresPower);
    return converter[methodConverterMap[methodConverter]]();
};

export { BaseUnitConverter, DifferentUnitConverter, execLengthConverter };

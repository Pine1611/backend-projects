/**
 * Find the unit of system convert exist in the system of measurement. If it exist, return the object with unit details.
 * @param {Array} array array of unit system
 * @param {String} attr property `symbol` for check unit exist in the unit system
 * @param {String} value unit `symbol` for check in the unit system
 * @returns Unit object if the value exists, return false [-1] if not
 */
export default function findWithArray(array, attr, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][attr] === value) {
            let unitObj = {
                index: i,
                name: array[i]["name"],
                unitSystem: array[i]["type"],
                symbol: array[i][attr],
            };
            // check if has own property will add new properties for object
            array[i].hasOwnProperty("power") ? (unitObj.power = array[i]["power"]) : "";
            array[i].hasOwnProperty("metres") ? (unitObj.metres = array[i]["metres"]) : "";
            array[i].hasOwnProperty("freezePoint") ? (unitObj.freezePoint = array[i]["freezePoint"]) : "";
            return unitObj;
        }
    }
    return -1;
}

/**
 * Format the result decimal with number digits after the decimal point or integer format with comas.
 * @param {Number} value value need to format
 * @param {Number} digits number digit after coma
 * @returns Return result with format float or int with coma
 */
export default function formatResult(value, digits) {
    let result = Number(value.toFixed(digits));

    if (result === result && result % 1 !== 0) {
        return result;
    } else {
        return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

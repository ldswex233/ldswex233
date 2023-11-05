/**
 * 
 * @param {String} str 
 * @returns {Boolean}
 */
function isJson(str) {
    try {
        JSON.parse(str);
    } catch {
        return false;
    }

    return true;
}

module.exports = {
    isJson
}
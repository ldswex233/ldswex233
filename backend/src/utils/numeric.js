/**
 * The maximum is exclusive and the minimum is inclusive
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    getRandom
}
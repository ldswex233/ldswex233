require("dotenv").config();

const jwt = require("jsonwebtoken");

/**
 * 
 * @param {import("express").Request} req 
 * @returns {String|Null}
 */
function getPlainToken(req) {
    if(!("authorization" in req.headers)) return null;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer AUTH_TOKEN

    return token;
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {Function} next
 * @returns
 */
function authenticateToken(req, res, next) {
    const token = getPlainToken(req); // Bearer AUTH_TOKEN

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) {
            return res.sendStatus(403);
        }

        res.locals = response;
        next();
    });
}

/**
 * 
 * @param {String} token 
 * @returns {{ id: number, username: string, pin: number }}
 */
function exportTokenData(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN);
}

module.exports = { authenticateToken, getPlainToken, exportTokenData };

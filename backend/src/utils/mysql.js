const connection = require("../connection");

class WhereStatement {
    constructor() {
        this.statement = {};
    }

    /**
     *
     * @param {String} key
     * @param {String|Number} value
     * @returns {WhereStatement}
     */
    add(key, value) {
        this.statement[key] = value;

        return this;
    }
}

class OrderStatement {
    constructor() {
        this.statement = {};
    }

    /**
     *
     * @param {String} column column to sort
     * @param {"ASC"|"DESC"} type sort type ASC / DESC
     * @returns {OrderStatement}
     */
    add(column, type) {
        this.statement[column] = type;

        return this;
    }
}

class RestStatement {
    constructor() {
        this.rests = [];
    }

    /**
     *
     * @param {WhereStatement|OrderStatement} statement
     * @returns {RestStatement}
     */
    add(statement) {
        this.rests.push(statement);

        return this;
    }

    getQuery() {
        let restQueryString = "";
        let restQueryValues = [];

        this.rests.forEach((part) => {
            if (part instanceof WhereStatement) {
                const data = part.statement;

                restQueryString += `WHERE ${Object.keys(data)
                    .map((el) => `${el} = ?`)
                    .join(" AND ")}`;

                restQueryValues = restQueryValues.concat(Object.values(data));
            }

            if (part instanceof OrderStatement) {
                const data = part.statement;

                restQueryString += `ORDER BY ${Object.keys(data)
                    .map((key) => `${key} ${data[key]}`)
                    .join(", ")}`;
            }
        });

        return {
            string: restQueryString,
            values: restQueryValues,
        };
    }
}

/**
 *
 * @param {String} table
 * @param {RestStatement} rest
 * @returns {Array<RowDataPacket>}
 */
async function get(table, rest = new RestStatement()) {
    const prefix = `SELECT * FROM \`${table}\``;

    const restQuery = rest.getQuery();
    const statement = `${prefix} ${restQuery.string}`;

    return await new Promise((resolve, reject) => {
        connection.query(statement, restQuery.values, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 * An alias for delete mysql method
 * @param {String} table
 * @param {RestStatement} rest
 * @returns {import("mysql").OkPacket}
 */
async function remove(table, rest = new RestStatement()) {
    const prefix = `DELETE FROM \`${table}\``;

    const restQuery = rest.getQuery();
    const statement = `${prefix} ${restQuery.string}`;

    return await new Promise((resolve, reject) => {
        connection.query(statement, restQuery.values, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

/**
 *
 * @param {String} table
 * @param {{key: String, value: String|Number}} values
 * @param {RestStatement} rest
 * @returns {import("mysql").OkPacket}
 */
async function update(table, values, rest = new RestStatement()) {
    const prefix = `UPDATE \`${table}\` SET`;
    const columns = `${Object.keys(values)
        .map((el) => `${el} = ?`)
        .join(", ")}`;

    const restQuery = rest.getQuery();
    const statement = `${prefix} ${columns} ${restQuery.string}`;

    return await new Promise((resolve, reject) => {
        connection.query(
            statement,
            Object.values(values).concat(restQuery.values),
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

/**
 *
 * @param {String} table
 * @param {{key: String, value: String|Number}} values
 * @param {RestStatement} rest
 * @returns {import("mysql").OkPacket}
 */
async function insert(table, values, rest = new RestStatement()) {
    const prefix = `INSERT INTO \`${table}\``;
    const columns = `(${Object.keys(values).join(", ")})`;

    const restQuery = rest.getQuery();
    const statement = `${prefix} ${columns} VALUES(${Object.values(values)
        .map((el) => "?")
        .join(", ")}) ${restQuery.string}`;

    return await new Promise((resolve, reject) => {
        connection.query(
            statement,
            Object.values(values).concat(restQuery.values),
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

/**
 *
 * @param {String} table
 * @param {RestStatement} rest
 * @returns {Number}
 */
async function count(table, rest = new RestStatement()) {
    const prefix = `SELECT COUNT(*) AS rowCount FROM \`${table}\``;

    const restQuery = rest.getQuery();
    const statement = `${prefix} ${restQuery.string}`;

    return await new Promise((resolve, reject) => {
        connection.query(statement, restQuery.values, (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results[0].rowCount);
            }
        });
    });
}

/**
 *
 * @param {String} statement
 * @returns {Array<RowDataPacket>}
 */
async function getFullQuery(statement) {
    const sql = statement;

    const res = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(result);
            }
        });
    });

    return res;
}

/**
 *
 * @param {String} table
 * @returns {Number}
 */
async function getNextAutoIncrementNumber(table) {
    const query = await getFullQuery(`SHOW TABLE STATUS LIKE '${table}'`);

    return query[0].Auto_increment;
}

module.exports = {
    insert,
    update,
    get,
    remove,
    count,
    getNextAutoIncrementNumber,
    RestStatement,
    WhereStatement,
    OrderStatement,
};

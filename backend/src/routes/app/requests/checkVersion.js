const express = require("express");
const { get, RestStatement, OrderStatement } = require("../../../utils/mysql");
const router = express.Router();

router.get("/", async (req, res) => {
    const query = await get(`updates`, new RestStatement()
        .add(new OrderStatement().add(`id`, "DESC"))
    )

    return res
        .status(200)
        .json({ version: query[0] })
});

module.exports = router;
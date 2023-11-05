const express = require("express");
const { userService } = require("../../../services/userService");
const { authenticateToken } = require("../../../modules/token");
const router = express.Router();

require("dotenv").config();

router.get("/", authenticateToken, async (req, res) => {
    const allUsers = userService.getAll();

    const array = Object.values(Object.fromEntries(allUsers)).map(e => {
        const copy = Object.assign({}, e);

        copy.pin = null;

        return copy;
    })

    return res
        .status(200)
        .json({ users: array })
});

module.exports = router;
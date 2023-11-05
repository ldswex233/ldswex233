const express = require("express");
const { authenticateToken, getPlainToken, exportTokenData } = require("../../../modules/token");
const router = express.Router();

require("dotenv").config();

router.post("/", authenticateToken, async (req, res) => {
    const tokenData = exportTokenData(getPlainToken(req));

    return res
        .status(200)
        .json({ username: tokenData.username })
});

module.exports = router;
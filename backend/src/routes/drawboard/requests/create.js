const express = require("express");
const { darwboardService } = require("../../../services/drawboardService");
const router = express.Router();

require("dotenv").config();

router.post("/", async (req, res) => {
    const body = req.body;

    const drawboard = darwboardService.create();

    return res
        .status(200)
        .json({ drawboard: drawboard })
});

module.exports = router;
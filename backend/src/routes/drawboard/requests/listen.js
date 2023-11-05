const express = require("express");
const { darwboardService } = require("../../../services/drawboardService");
const { wsService } = require("../../../services/wsService");
const { authenticateToken, getPlainToken, exportTokenData } = require("../../../modules/token");
const router = express.Router();

require("dotenv").config();

router.post("/", authenticateToken, async (req, res) => {
    const body = req.body;

    if(!body.key || isNaN(body.key)) {
        return res
            .status(500)
            .json({ message: "Brak parametru key" })
    }

    const key = parseInt(body.key);

    if(!darwboardService.hasKey(key)) {
        return res
            .status(404)
            .json({ message: "Nie znaleziono tablicy" })
    }

    const tokenData = exportTokenData(getPlainToken(req));
    const drawboard = darwboardService.getByKey(key);

    drawboard.addListeningUserId(tokenData.id);

    return res
        .status(200)
        .json({ drawboard: drawboard })
});

module.exports = router;
const express = require("express");
const { authenticateToken, getPlainToken, exportTokenData } = require("../../../modules/token");
const { userStatisticsService } = require("../../../services/userStatisticsService");
const router = express.Router();

require("dotenv").config();

router.get("/", authenticateToken, async (req, res) => {
    const tokenData = exportTokenData(getPlainToken(req));

    if(!tokenData.id) 
        return res
            .status(401)
            .json({ message: "Brak parametru id w tokenie" });

    if(!userStatisticsService.has(tokenData.id)) {
        userStatisticsService.create(tokenData.id, 0, 0, 0);
    }

    const userStatistics = userStatisticsService.get(tokenData.id);

    return res
        .status(200)
        .json(userStatistics)
});

module.exports = router;
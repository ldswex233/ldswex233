const express = require("express");
const { userService } = require("../../../services/userService");
const { authenticateToken, getPlainToken, exportTokenData } = require("../../../modules/token");
const config = require("../../../config");
const router = express.Router();

require("dotenv").config();

router.get("/", authenticateToken, async (req, res) => {
    const tokenData = exportTokenData(getPlainToken(req));

    if(!tokenData.id) 
        return res
            .status(401)
            .json({ message: "Brak parametru id w tokenie" });

    const user = userService.get(tokenData.username);

    const userPassedRanks = Object.keys(config.ranks).filter(e => user.getExperience() >= e);
    const userNotPassedRanks = Object.keys(config.ranks).filter(e => user.getExperience() < e);
    const userRank = userPassedRanks[userPassedRanks.length - 1];
    const previousRank = (userPassedRanks.length >= 2 ? userPassedRanks[userPassedRanks.length - 2] : 0);
    const nextRank = (userNotPassedRanks.length === 0 ? null : userNotPassedRanks[0]);

    return res
        .status(200)
        .json({
            experience: user.getExperience(),
            progressedExperience: user.getExperience() - userRank,
            toNextRank: nextRank - (nextRank === null ? 0 : userRank),
            nextRankTotalExperience: nextRank,
            rank: {
                previous: config.ranks[previousRank],
                actual: config.ranks[userRank],
                next: (nextRank === null ? 'Brak' : config.ranks[nextRank])
            }
        })
});

module.exports = router;
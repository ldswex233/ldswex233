const express = require("express");
const { authenticateToken, exportTokenData, getPlainToken } = require("../../../modules/token");
const { calendarService } = require("../../../services/calendarService");
const { userService } = require("../../../services/userService");
const { getRandom } = require("../../../utils/numeric");
const { userStatisticsService } = require("../../../services/userStatisticsService");
const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
    const body = req.body;

    if(!body.year || !body.month || !body.day || !body.subject || !body.description || !body.type)
        return res
            .status(401)
            .json({ message: "Brak parametru subject, year, month, day, description lub type" });
    
    const { year, month, day, subject, description, type } = body;

    if(isNaN(year) || isNaN(month) || isNaN(day))
        return res
            .status(401)
            .json({ message: "Parametry year, month i day powinny być liczbami" });

    const tokenData = exportTokenData(getPlainToken(req));

    if(!tokenData.id) 
        return res
            .status(401)
            .json({ message: "Brak parametru id w tokenie" });

    const user = userService.get(tokenData.username);
    user.addExperience(getRandom(10, 5));

    const userStatistics = userStatisticsService.getCreate(tokenData.id);
    userStatistics.addWrites(1);

    const work = await calendarService.create(year, month, day, subject, description, type, tokenData.id);

    return res
        .status(200)
        .json({ work: work, message: "Pomyślnie stworzno pracę" })
})

module.exports = router;
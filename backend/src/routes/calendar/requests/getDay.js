const express = require("express");
const { authenticateToken } = require("../../../modules/token");
const { calendarService } = require("../../../services/calendarService");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
    const body = req.query;

    if(!body.year || !body.month || !body.day)
        return res
            .status(401)
            .json({ message: "Brak parametrów year, month, day" });
    
    const { year, month, day } = body;

    if(isNaN(year) || isNaN(month) || isNaN(day))
        return res
            .status(401)
            .json({ message: "Parametry year, month, day nie są liczbami" })

    return res
        .status(200)
        .json({ day: calendarService.getByDay(year, month, day) });
})

module.exports = router;
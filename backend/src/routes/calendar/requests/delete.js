const express = require("express");
const { authenticateToken } = require("../../../modules/token");
const { calendarService } = require("../../../services/calendarService");
const router = express.Router();

router.delete("/", authenticateToken, (req, res) => {
    const body = req.body;

    if(!body.workId)
        return res
            .status(401)
            .json({ message: "Brak parametru workId" });
    
    const { workId } = body;

    if(isNaN(workId))
        return res
            .status(401)
            .json({ message: "Parametr workId nie jest liczbą" })

    if(!calendarService.has(workId))
        return res
            .status(404)
            .json({ message: "Nie znaleziono pracy z takim id" })

    calendarService.delete(parseInt(workId));

    return res
        .status(200)
        .json({ message: "Pomyślnie usunięto pracę" });
})

module.exports = router;
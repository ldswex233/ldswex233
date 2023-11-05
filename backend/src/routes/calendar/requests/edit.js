const express = require("express");
const { authenticateToken } = require("../../../modules/token");
const { calendarService } = require("../../../services/calendarService");
const router = express.Router();

router.post("/", authenticateToken, (req, res) => {
    const body = req.body;

    if(!body.workId || !body.subject || !body.description || !body.type)
        return res
            .status(401)
            .json({ message: "Brak parametrów workId, subject, description, type" });
    
    const { workId, subject, description, type } = body;

    if(isNaN(workId))
        return res
            .status(401)
            .json({ message: "Parametr workId nie jest liczbą" })

    if(!calendarService.has(workId))
        return res
            .status(404)
            .json({ message: "Nie znaleziono pracy z takim id" })

    const work = calendarService.get(workId);

    work.setSubject(subject);
    work.setDescription(description);
    work.setType(type);

    return res
        .status(200)
        .json({ work: work, message: "Pomyślnie zedytowano pracę" });
})

module.exports = router;
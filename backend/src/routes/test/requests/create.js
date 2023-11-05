const express = require("express");
const { testService } = require("../../../services/testService");
const { subjectService } = require("../../../services/subjectService");
const router = express.Router();

require("dotenv").config();

router.post("/", async (req, res) => {
    const body = req.body;

    if(!body.name || !body.subjectId || isNaN(body.subjectId)) {
        return res
            .status(401)
            .json({ message: "Brak parametru name lub subjectId" });
    }

    const subjectId = parseInt(body.subjectId);

    if(!subjectService.has(subjectId)) {
        return res
            .status(404)
            .json({ message: "Taki przedmiot nie istnieje" })
    }

    const test = await testService.create(subjectId, body.name);

    return res
        .status(200)
        .json({ test: test })
});

module.exports = router;
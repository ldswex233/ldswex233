const express = require("express");
const { testService } = require("../../../services/testService");
const { subjectService } = require("../../../services/subjectService");
const router = express.Router();

require("dotenv").config();

router.post("/", async (req, res) => {
    const body = req.body;

    if(!body.testId || isNaN(body.testId) || !body.name || !body.subjectId || isNaN(body.subjectId)) {
        return res
            .status(500)
            .json({ message: "Brak parametru testId, name lub subjectId" });
    }

    const testId = parseInt(body.testId);

    if(!testService.has(testId)) {
        return res
            .status(404)
            .json({ message: "Nie znaleziono testu z takim id" })
    }

    const subjectId = parseInt(body.subjectId);

    if(!subjectService.has(subjectId)) {
        return res
            .status(404)
            .json({ message: "Taki przedmiot nie istnieje" })
    }

    const test = testService.get(testId);

    test.setName(body.name);
    test.setSubjectId(subjectId);

    return res
        .status(200)
        .json({ test: test })
});

module.exports = router;
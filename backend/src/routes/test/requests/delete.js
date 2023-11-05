const express = require("express");
const { testService } = require("../../../services/testService");
const { questionService } = require("../../../services/questionService");
const router = express.Router();

require("dotenv").config();

router.delete("/", async (req, res) => {
    const body = req.body;

    if(!body.testId || isNaN(body.testId)) {
        return res
            .status(401)
            .json({ message: "Brak parametru testId" });
    }

    const testId = parseInt(body.testId);

    if(!testService.has(testId)) {
        return res
            .status(404)
            .json({ message: "Nie znaleziono testu z takim id" })
    }

    testService.delete(testId);

    questionService.getTestQuestions(testId).forEach(question => {
        questionService.deleteQuestion(question);
    })

    return res
        .status(200)
        .json({ message: "Pomyślnie usunięto test" })
});

module.exports = router;
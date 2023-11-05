const express = require("express");
const { questionService } = require("../../../services/questionService");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
    const query = req.query;

    if(!query.testId || isNaN(query.testId)) {
        return res
            .status(500)
            .json({ message: "Brak parametru testId" })
    }

    const testId = parseInt(query.testId);
    const questions = questionService.getTestQuestions(testId);

    return res
        .status(200)
        .json({ questions: questions })
});

module.exports = router;
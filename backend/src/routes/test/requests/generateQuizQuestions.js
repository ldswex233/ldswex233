const express = require("express");
const { questionService } = require("../../../services/questionService");
const { shuffleArray } = require("../../../utils/array");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
    const query = req.query;

    if(!query.testId || isNaN(query.testId) || !query.questionsNumber || isNaN(query.questionsNumber)) {
        return res
            .status(500)
            .json({ message: "Brak parametru testId, questionsNumber" })
    }

    const testId = parseInt(query.testId);
    const questions = questionService.getTestQuestions(testId);
    const questionsNumber = parseInt(query.questionsNumber); // questions to generate in quiz
    const questionsToGenerate = (questionsNumber > questions.length ? questions.length : questionsNumber); // real number to generate questions i case if questionsNumber is higher than actual quesitons in quiz
    const pickedQuestions = [...questions];

    while(pickedQuestions.length > questionsToGenerate) {
        const randomIndex = Math.floor(Math.random() * pickedQuestions.length);

        pickedQuestions.splice(randomIndex, 1);
    }

    return res
        .status(200)
        .json({ questions: shuffleArray(pickedQuestions) })
});

module.exports = router;
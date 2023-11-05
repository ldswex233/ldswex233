const express = require("express");
const { testService } = require("../../../services/testService");
const { QuestionOptions, questionService } = require("../../../services/questionService");
const router = express.Router();

require("dotenv").config();

router.post("/", async (req, res) => {
    const body = req.body;

    if(!body.testId || !body.type || !body.data) {
        return res
            .status(500)
            .json({ message: "Brak jednego z parametrów testId, type, data" })
    }

    if(isNaN(body.testId)) {
        return res
            .status(500)
            .json({ message: "Test id nie jest liczbą" })
    }

    const testId = parseInt(body.testId);

    if(!testService.has(testId)) {
        return res
            .status(404)
            .json({ message: "Nie znaleziono testu z takim id" })
    }

    const data = body.data;

    switch(body.type) {
        case "options":
            if(!("question" in data) || !("options" in data) || !("correct" in data) || !("allowRandom" in data)) {
                return res
                    .status(500)
                    .json({ message: "Brak parametrów (data) question, options, correct, allowRandom" })
            }

            if(!Array.isArray(data.options) || !Array.isArray(data.correct)) {
                return res
                    .status(500)
                    .json({ message: "Parametry options lub correct nie są listami" })
            }

            if(data.options.length < 2) {
                return res
                    .status(500)
                    .json({ message: "Nie podano wystarczającej ilości opcji" })
            }

            if(data.correct.length === 0) {
                return res
                    .status(500)
                    .json({ message: "Brak zdefiniowanych poprawnych odpowiedzi" })
            }

            const questionOptions = new QuestionOptions(
                (await questionService.getNextId(body.type)),
                testId,
                data.question,
                data.options,
                data.correct,
                data.allowRandom
            );

            questionService.create(questionOptions)

            return res
                .status(200)
                .json({ question: questionOptions })
    }

    return res
        .status(500)
        .json({ message: "Something went wrong" })
});

module.exports = router;
const express = require("express");
const { testService } = require("../../../services/testService");
const { testSummaryService } = require("../../../services/testSummaries");
const { authenticateToken, exportTokenData, getPlainToken } = require("../../../modules/token");
const { userStatisticsService } = require("../../../services/userStatisticsService");
const { userService } = require("../../../services/userService");
const { getRandom } = require("../../../utils/numeric");
const router = express.Router();

require("dotenv").config();

router.post("/", authenticateToken, async (req, res) => {
    const body = req.body;

    if(!body.testId || isNaN(body.testId) || !body.totalQuestions || isNaN(body.totalQuestions) || !body.wrongQuestionsIds || !Array.isArray(body.wrongQuestionsIds)) {
        return res
            .status(401)
            .json({ message: "Brak parametru testId, wrongQuestionsIds" })
    }

    const testId = parseInt(body.testId);

    if(!testService.has(testId)) {
        return res
            .status(404)
            .json({ message: "Nie znaleziono testu" })
    }

    const tokenData = exportTokenData(getPlainToken(req));
    const totalQuestions = parseInt(body.totalQuestions);

    const summaryData = {
        wrongQuestionsIds: body.wrongQuestionsIds.filter(e => !isNaN(e)).map(e => parseInt(e))
    }

    const summary = await testSummaryService.create(tokenData.id, testId, summaryData);

    const user = userService.get(tokenData.username);
    const experienceToAdd = totalQuestions + getRandom(5, 10);

    user.addExperience(experienceToAdd);

    const userStatistics = userStatisticsService.getCreate(tokenData.id);
    userStatistics.addTests(1);
    userStatistics.addQuestions(totalQuestions);

    return res
        .status(200)
        .json({ summary: summary })
});

module.exports = router;
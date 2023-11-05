const express = require("express");
const { subjectService } = require("../../../services/subjectService");
const { testService } = require("../../../services/testService");
const { authenticateToken, getPlainToken, exportTokenData } = require("../../../modules/token");
const { testSummaryService } = require("../../../services/testSummaries");
const router = express.Router();

require("dotenv").config();

router.get("/",  async (req, res) => {
    const query = req.query;

    if(query.subjectId) {
        if(isNaN(query.subjectId))  {
            return res
                .status(401)
                .json({ message: "Subject id nie jest liczbą" })
        }

        const subjectId = parseInt(query.subjectId);

        if(!subjectService.has(subjectId)) {
            return res
                .status(404)
                .json({ message: "Nie znaleziono przedmiotu" })
        }

        const subject = subjectService.get(subjectId);

        return res
            .status(200)
            .json({ subject: subject })
    }

    const subjects = Object.assign({}, Object.fromEntries(subjectService.getAll()));
    const hasToken = getPlainToken(req) !== null;
    const tokenData = (hasToken ? exportTokenData(getPlainToken(req)) : null);

    for(const [key, value] of Object.entries(subjects)) {
        subjects[key].tests = testService.getBySubject(parseInt(key)).map(test => {
            if(tokenData === null) return test;
            
            const copy = test;
            const userSummaries = testSummaryService.getUserSummaries(tokenData.id);

            copy.doneByUser = userSummaries.getByTestId(test.getId()).length > 0;

            return copy;
        });
    }

    return res
        .status(200)
        .json({ subjects: subjects })
});

module.exports = router;